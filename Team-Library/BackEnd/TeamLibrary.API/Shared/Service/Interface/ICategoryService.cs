using ErrorOr;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;

namespace TeamLibrary.API.Shared.Service.Interface
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<GetCategoryByIdDto> GetCategoryByIdAsync(int id);
        Task<ErrorOr<string>> AddCategoryAsync(CreateCategoryDto category);
        Task<ErrorOr<string>> UpdateCategoryAsync(UpdateCategoryDto category);
        Task<ErrorOr<bool>> DeleteCategoryByIdAsync(int categoryId);

    }
}
