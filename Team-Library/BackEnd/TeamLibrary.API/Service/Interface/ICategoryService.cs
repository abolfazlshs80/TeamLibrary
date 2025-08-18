using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;

namespace TeamLibrary.API.Service.Interface
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> GetCategoryByIdAsync(int categoryId);
        Task<bool> AddCategoryAsync(CreateCategoryDto category);
        Task<bool> UpdateCategoryAsync(UpdateCategoryDto dto);
        Task DeleteCategoryAsync(Category category);
        Task DeleteCategoryByIdAsync(int categoryId);

    }
}
