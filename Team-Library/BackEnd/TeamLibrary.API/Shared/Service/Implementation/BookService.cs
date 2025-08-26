using DrMeet.Api.Shared.Persistence.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Book.DTOs.Response;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.PagedList;

namespace TeamLibrary.API.Shared.Service.Implementation
{
    public class BookService : IBookService
    {
        private readonly IUnitOfWork _unitOfWork;
        public BookService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
    }
}