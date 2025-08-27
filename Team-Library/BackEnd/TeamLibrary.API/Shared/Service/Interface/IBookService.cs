using ErrorOr;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Book.DTOs.Response;

namespace TeamLibrary.API.Shared.Service.Interface
{
    public interface IBookService
    {
        Task<List<GetBookByCategorySlugResponseDto>> GetBooksByCategorySlugAsync(string slug);
        Task<ErrorOr<string>> AddBookAsync(CreateBookRequestDto book);
        Task<GetBookByIdResponseDto> GetBookByIdForShowDetailAsync(int bookId);

    }
}