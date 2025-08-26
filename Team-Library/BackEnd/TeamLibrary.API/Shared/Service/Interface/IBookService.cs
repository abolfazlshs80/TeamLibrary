using TeamLibrary.API.Featrues.Book.DTOs.Response;

namespace TeamLibrary.API.Shared.Service.Interface
{
    public interface IBookService
    {
        Task<List<GetBookByCategorySlugResponseDto>> GetBooksByCategorySlugAsync(string slug);

    }
}