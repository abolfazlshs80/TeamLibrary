using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Service.Interface
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> GetCategoryByIdAsync(int categoryId);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(Category category);
        Task DeleteCategoryByIdAsync(int categoryId);

    }
}
