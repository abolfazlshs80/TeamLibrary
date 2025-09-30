using ErrorOr;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Book.DTOs.Response;
using TeamLibrary.API.Shared.PagedList;

namespace TeamLibrary.API.Shared.Service.Interface
{
    public interface IBookService
    {
        Task<List<GetBookByCategorySlugResponseDto>> GetBooksByCategorySlugAsync(string slug);
        Task<ErrorOr<string>> AddBookAsync(CreateBookRequestDto book);
        Task<GetBookByIdResponseDto> GetBookByIdForShowDetailAsync(int bookId);
        Task<GetBookBySlugResponseDto> GetBookBySlugForShowDetailAsync(string slug);
        Task<ErrorOr<string>> DeleteBookByIdAsync(int id);
        Task<ErrorOr<string>> UpdateBookAsync(UpdateBookRequestDto dto);
        Task<PagedList<GetBookListResponseDto>> GetAllBooksAsync(GetBookListRequestDto request);
        Task<List<GetBookListResponseDto>> GetNewBooksAsync();
        Task<List<GetBookListResponseDto>> GetTopRatedBooksAsync();

        Task<ErrorOr<string>> IncrementViewCountAsync(int bookId);

    }
}