using ErrorOr;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Featrues.Category.DTOs.Request;
using TeamLibrary.API.Shared.PagedList;

namespace TeamLibrary.API.Shared.Service.Interface
{
    public interface ICategoryService
    {
        Task<PagedList<GetCategoryListResponseDto>> GetAllCategoryAsync(GetCategoryListRequestDto request);
        Task<GetCategoryByIdResponseDto> GetCategoryByIdAsync(int id);
        Task<ErrorOr<string>> AddCategoryAsync(CreateCategoryRequestDto category);
        Task<ErrorOr<string>> UpdateCategoryAsync(UpdateCategoryRequestDto category);
        Task<ErrorOr<bool>> DeleteCategoryByIdAsync(int categoryId);

    }
}
