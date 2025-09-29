using DrMeet.Api.Shared.Persistence.UnitOfWork;
using ErrorOr;
using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Book.DTOs.Response;
using TeamLibrary.API.Shared.Models.Enums;
using TeamLibrary.API.Shared.PagedList;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Shared.Service.Implementation
{
    public class BookService : IBookService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMediaService _mediaService;

        public BookService(IUnitOfWork unitOfWork, IMediaService mediaService)
        {
            _unitOfWork = unitOfWork;
            _mediaService = mediaService;
        }

        public async Task<ErrorOr<string>> AddBookAsync(CreateBookRequestDto book)
        {
            try
            {
                var slugexists = await _unitOfWork.Books.AsQueryable().AnyAsync(b => b.Slug == book.Slug);
                if (slugexists)
                {
                    return Error.Validation("Slug", "این اسلاگ قبلاً استفاده شده است.");
                }

                var categoryExists = await _unitOfWork.Categories.AsQueryable().AnyAsync(b => b.Id == book.CategoryId);
                if (!categoryExists)
                {
                    return Error.Validation("category", "دسته بندی یافت نشد");
                }

                // Handle image upload if provided
                string imagePath = book.Image;
                //if (imageFile != null)
                //{
                //    var uploadResult = await _mediaService.UploadImageAsync(imageFile, FolderImagesType.Blog);
                //    if (uploadResult.IsError)
                //    {
                //        return Error.Failure("Upload", uploadResult.FirstError.Description);
                //    }
                //    imagePath = uploadResult.Value;
                //}

                await _unitOfWork.Books.AddAsync(new Book
                {
                    Author = book.Author,
                    Title = book.Title,
                    Description = book.Description,
                    Translator = book.Translator,
                    
                    ImagePath = imagePath,
                    Language = book.Language,
                    PdfPath = book.PdfPath,
                    Pages = book.Pages,
                    PublicationYear = book.PublicationYear,
                    Price = book.Price,
                    Rank = book.Rank,
                    Slug = book.Slug,
                    CategoryId = book.CategoryId,
                    CreateDateDatetime = DateTime.Now,
                });

                return "کتاب ثبت شد";
            }
            catch (Exception ex)
            {
                return Error.Failure("AddBook", ex.Message);
            }
        }

        public async Task<ErrorOr<string>> DeleteBookByIdAsync(int id)
        {
            try
            {
                var book = await _unitOfWork.Books.GetByIdAsync(id);
                if (book is null)
                    return Error.NotFound("Book.NotFound", "کتاب مورد نظر یافت نشد.");

                // Delete the associated image if it exists
                if (!string.IsNullOrEmpty(book.ImagePath))
                {
                    var deleteResult = await _mediaService.DeleteImageAsync(book.ImagePath);
                    if (deleteResult.IsError)
                    {
                        // Log the error but continue with book deletion
                        // You might want to handle this differently based on your requirements
                    }
                }

                await _unitOfWork.Books.DeleteAsync(id);
                return "کتاب با موفقیت حذف شد.";
            }
            catch (Exception ex)
            {
                return Error.Failure("DeleteBook", ex.Message);
            }
        }

        public async Task<ErrorOr<string>> UpdateBookAsync(UpdateBookRequestDto dto)
        {
            try
            {
                var book = await _unitOfWork.Books.GetByIdAsync(dto.Id);
                if (book == null)
                {
                    return Error.NotFound(description: "کتاب پیدا نشد");
                }

                var categoryExists = await _unitOfWork.Categories.AsQueryable().AnyAsync(b => b.Id == dto.CategoryId);
                if (!categoryExists)
                {
                    return Error.Validation("category", "دسته بندی یافت نشد");
                }

                // Handle image update if new image is provided
                if (dto.Image != null)
                {
                    // Delete old image if it exists
                    //if (!string.IsNullOrEmpty(book.ImagePath))
                    //{
                    //    await _mediaService.DeleteImageAsync(book.ImagePath);
                    //}

                    //// Upload new image
                    //var uploadResult = await _mediaService.UploadImageAsync(imageFile, FolderImagesType.Blog);
                    //if (uploadResult.IsError)
                    //{
                    //    return Error.Failure("Upload", uploadResult.FirstError.Description);
                    //}
                    //book.ImagePath = uploadResult.Value;
                    book.ImagePath = dto.Image;
                }

                book.Title = dto.Title;
                book.Slug = dto.Slug;
                book.CategoryId = dto.CategoryId;
                book.PdfPath = dto.PdfPath;
                book.Description = dto.Description;
                book.Rank = dto.Rank;
                book.PublicationYear = dto.PublicationYear;
                book.Author = dto.Author;
                book.Pages = dto.Pages;
                book.Price = dto.Price;
                book.Language = dto.Language;
                book.UpdateDateDatetime = DateTime.Now;

                await _unitOfWork.Books.UpdateAsync(book);
                return "کتاب با موفقیت ویرایش شد";
            }
            catch (Exception ex)
            {
                return Error.Failure("UpdateBook", ex.Message);
            }
        }

        public async Task<PagedList<GetBookListResponseDto>> GetAllBooksAsync(GetBookListRequestDto request)
        {
            var books = _unitOfWork.Books.AsQueryable()
                        .Include(b => b.Category)
                        .AsQueryable();

            if(request.Rank.HasValue)
            {
                books = books.Where(b => b.Rank == request.Rank);
            }

            if (request.MinPageCount.HasValue) 
            {
                books = books.Where(b => b.Pages == request.MinPageCount);
            }

            if (request.MaxPageCount.HasValue)
            {
                books = books.Where(b => b.Pages == request.MaxPageCount);
            }

            if (!string.IsNullOrEmpty(request.Language))
                books = books.Where(b => b.Language == request.Language);

            if (!string.IsNullOrEmpty(request.Author))
                books = books.Where(b => b.Author.Contains(request.Author));

            if (!string.IsNullOrEmpty(request.Category))
                books = books.Where(b => b.Category.Name.Contains(request.Category));

            if (!string.IsNullOrEmpty(request.Search))
                books = books.Where(b => b.Title.Contains(request.Search)
                                      || b.Slug.Contains(request.Search));

            var result = await books.ToPagedList(s => new GetBookListResponseDto
            {
                Id = s.Id,
                Title = s.Title,
                Author = s.Author,
                Slug = s.Slug,
                CategoryName = s.Category.Name,
                CreateDateTime = s.CreateDateDatetime,
                UpdateDateTime = s.UpdateDateDatetime.HasValue ? s.UpdateDateDatetime : null,
                ImageUrl = _mediaService.GetImageUrl(s.ImagePath), // Add image URL
                Rank = s.Rank
            }, request.PageNumber, request.PageSize);

            return result;
        }

        public async Task<GetBookByIdResponseDto> GetBookByIdForShowDetailAsync(int bookId)
        {
            var bookExist = await _unitOfWork.Books.AsQueryable()
                .Include(b => b.Category)
                .FirstOrDefaultAsync(b => b.Id == bookId);

            if (bookExist == null)
            {
                return null;
            }

            // Increment view count
            await IncrementViewCountAsync(bookId);

            var book = new GetBookByIdResponseDto
            {
                Id = bookExist.Id,
                Title = bookExist.Title,
                Slug = bookExist.Slug,
                Description = bookExist.Description,
                Author = bookExist.Author,
                PublicationYear = bookExist.PublicationYear,
                Pages = bookExist.Pages,
                Price = bookExist.Price,
                Language = bookExist.Language,
                ImagePath = _mediaService.GetImageUrl(bookExist.ImagePath), // Convert to URL
                PdfPath = bookExist.PdfPath,
                CreateDateTime = bookExist.CreateDateDatetime,
                UpdateDateTime = bookExist.UpdateDateDatetime.HasValue ? bookExist.UpdateDateDatetime : null,
                CategoryName = bookExist.Category.Name
            };

            return book;
        }

        public async Task<GetBookBySlugResponseDto> GetBookBySlugForShowDetailAsync(string slug)
        {
            var bookExist = await _unitOfWork.Books.AsQueryable().Include(b => b.Category)
                .FirstOrDefaultAsync(b => b.Slug == slug);

            if (bookExist == null)
            {
                return null;
            }

            // Increment view count
            bookExist.ViewCount++;
            await _unitOfWork.Books.UpdateAsync(bookExist);

            var book = new GetBookBySlugResponseDto
            {
          
                Title = bookExist.Title,
                Slug = bookExist.Slug,
                Description = bookExist.Description,
                Author = bookExist.Author,
                PublicationYear = bookExist.PublicationYear,
                Pages = bookExist.Pages,
                Price = bookExist.Price,
                Language = bookExist.Language,
                ImagePath = bookExist.ImagePath,
                PdfPath = bookExist.PdfPath,
                CategoryName = bookExist.Category.Name,
                Translators=bookExist.Translator,
                Rank=bookExist.Rank,
                
            };

            return book;

        }

        public async Task<List<GetBookByCategorySlugResponseDto>> GetBooksByCategorySlugAsync(string slug)
        {
            var books = await _unitOfWork.Books
                .AsQueryable()
                .Include(b => b.Category)
                .Where(b => b.Category.Slug == slug)
                .Select(b => new GetBookByCategorySlugResponseDto
                {
                    Title = b.Title,
                    Slug = b.Slug,
                    ImagePath = b.ImagePath,
                    Author = b.Author                 
                })
                .AsNoTracking()
                .AsSplitQuery()
                .ToListAsync();

            return books;
        }

        public async Task<List<GetBookListResponseDto>> GetNewBooksAsync()
        {
            var today = DateTime.Today;
            var books = await _unitOfWork.Books.AsQueryable()
                        .Include(b => b.Category)
                        .Where(b => b.CreateDateDatetime.Date == today)
                        .Select(b => new GetBookListResponseDto
                        {
                            Id = b.Id,
                            Title = b.Title,
                            Author = b.Author,
                            Slug = b.Slug,
                            CategoryName = b.Category.Name,
                            CreateDateTime = b.CreateDateDatetime,
                            UpdateDateTime = b.UpdateDateDatetime,
                            ImageUrl = _mediaService.GetImageUrl(b.ImagePath)
                        })
                        .ToListAsync();

            return books;
        }

        public async Task<List<GetBookListResponseDto>> GetTopRatedBooksAsync()
        {
            var books = await _unitOfWork.Books.AsQueryable()
                        .Include(b => b.Category)
                        .OrderByDescending(b => b.Rank)
                        .Take(10)
                        .Select(b => new GetBookListResponseDto
                        {
                            Id = b.Id,
                            Title = b.Title,
                            Author = b.Author,
                            Slug = b.Slug,
                            CategoryName = b.Category.Name,
                            CreateDateTime = b.CreateDateDatetime,
                            UpdateDateTime = b.UpdateDateDatetime,
                            Rank = b.Rank,
                            ImageUrl = _mediaService.GetImageUrl(b.ImagePath)
                        })
                        .ToListAsync();

            return books;
        }


        public async Task<ErrorOr<string>> IncrementViewCountAsync(int bookId)
        {
            try
            {
                var book = await _unitOfWork.Books.GetByIdAsync(bookId);
                if (book == null)
                {
                    return Error.NotFound("Book.NotFound", "کتاب یافت نشد.");
                }

                book.ViewCount++;
                await _unitOfWork.Books.UpdateAsync(book);
                return "تعداد بازدید به‌روزرسانی شد";
            }
            catch (Exception ex)
            {
                return Error.Failure("IncrementViewCount", ex.Message);
            }
        }

    }
}
