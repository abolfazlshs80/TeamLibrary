using ErrorOr;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;

namespace TeamLibrary.API.Service.Interface
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> GetCategoryByIdAsync(int categoryId);
        Task<ErrorOr<string>> AddCategoryAsync(CreateCategoryDto category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(Category category);
        Task DeleteCategoryByIdAsync(int categoryId);

    }
}
