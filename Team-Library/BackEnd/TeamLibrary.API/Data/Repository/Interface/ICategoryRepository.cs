using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Data.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(Category category);
        Task<bool> DeleteCategoryByIdAsync(int categoryId);
    
    }
}
