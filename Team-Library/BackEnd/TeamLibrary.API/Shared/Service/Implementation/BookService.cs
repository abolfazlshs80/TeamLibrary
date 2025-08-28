using DrMeet.Api.Shared.Persistence.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Book.DTOs.Response;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.PagedList;
using ErrorOr;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Data.Repository;

namespace TeamLibrary.API.Shared.Service.Implementation
{
    public class BookService : IBookService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BookService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ErrorOr<string>> AddBookAsync(CreateBookRequestDto book)
        {

            var slugexists = await _unitOfWork.Books.AsQueryable().AnyAsync(b => b.Slug == book.Slug);

            if (slugexists)
            {
                return Error.Validation("Slug", "این اسلاگ قبلاً استفاده شده است.");
            }

            await _unitOfWork.Books.AddAsync(new Book
            {
                Author = book.Author,
                Title = book.Title,
                Description = book.Description,
                ImagePath = book.ImagePath,
                Language = book.Language,
                PdfPath = book.PdfPath,
                Pages = book.Pages,
                PublicationYear = book.PublicationYear,
                Price = book.Price,
                Rank = book.Rank,
                Slug = book.Slug,
                CategoryId = book.CategoryId

            });

            return " کتاب ثبت شد";
        }

        public async Task<ErrorOr<string>> DeleteBookByIdAsync(int id)
        {
            var book = await _unitOfWork.Books.GetByIdAsync(id);
            if (book is null)
                return Error.NotFound("Book.NotFound", "کتاب مورد نظر یافت نشد.");

            await _unitOfWork.Books.DeleteAsync(id);
            return "کتاب با موفقیت حذف شد.";
        }

        //public async Task<DeleteBookResponseDto> DeleteBookAsync(DeleteBookRequestDto request)
        //{
        //    var book = await _unitOfWork.Books.GetByIdAsync(request.Id);

        //    if(book == null)
        //    {
        //        return new DeleteBookResponseDto
        //        {
        //            IsSuccess = false,
        //            Message = "کتاب مورد نظر یافت  نشد"

        //        };
        //    }

        //    _unitOfWork.Books.DeleteAsync(book.Id);
        //    await _unitOfWork.Books.UpdateAsync(book);

        //    return new DeleteBookResponseDto
        //    {
        //        IsSuccess = true,
        //        Message = "کتاب با موفقیت حذف شد."
        //    };

        //}

        public async Task<GetBookByIdResponseDto> GetBookByIdForShowDetailAsync(int bookId)
        {
            var bookExist = await _unitOfWork.Books.AsQueryable().Include(b => b.Category)
                .FirstOrDefaultAsync(b => b.Id == bookId);

            if (bookExist == null)
            {
                return null;
            }

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
                ImagePath = bookExist.ImagePath,
                PdfPath = bookExist.PdfPath,

           
                CategoryName = bookExist.Category.Name
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
                    Id = b.Id,
                    Title = b.Title,
                    Slug = b.Slug,
                    ImagePath = b.ImagePath,
                    PdfPath = b.PdfPath,
                    Description = b.Description,
                    CategoryId = b.CategoryId,
                    CategoryName = b.Category.Name
                })
                .ToListAsync();

            return books;
        }

        public async Task<ErrorOr<string>> UpdateBookAsync(UpdateBookRequestDto dto)
        {
            var book = await _unitOfWork.Books.GetByIdAsync(dto.Id);
            if (book == null)
            {
                return Error.NotFound(description: "کتاب پیدا نشد");
            }

            book.Title = dto.Title;
            book.Slug = dto.Slug;
            book.CategoryId = dto.CategoryId;
            book.ImagePath = dto.ImagePath;
            book.PdfPath = dto.PdfPath;
            book.Description = dto.Description;
            book.UserId = dto.UserId;
            book.Rank = dto.Rank;
            book.PublicationYear = dto.PublicationYear;
            book.Author = dto.Author;
            book.Pages = dto.Pages;
            book.Price = dto.Price;
            book.Language = dto.Language;

            await _unitOfWork.Books.UpdateAsync(book);
            return "کتاب با موفقیت ویرایش شد";
        }

    }
}