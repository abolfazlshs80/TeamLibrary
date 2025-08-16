using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository.Interface;
using TeamLibrary.API.Service.Interface;

namespace TeamLibrary.API.Service.Implementation
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public async Task AddCategoryAsync(Category category)
        {
            await _repository.AddCategoryAsync(category);
        }

        public async Task DeleteCategoryAsync(Category category)
        {
            await _repository.DeleteCategoryAsync(category);

        }

        public async Task DeleteCategoryByIdAsync(int categoryId)
        {

           await _repository.DeleteCategoryByIdAsync(categoryId);
        }

        public Task<List<Category>> GetAllCategoryAsync()
        {
            return _repository.GetAllCategoryAsync();
        }

        public Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return _repository.GetCategoryByIdAsync(categoryId);
        }

        public async Task UpdateCategoryAsync(Category category)
        {
           await UpdateCategoryAsync(category);
        }
    }
}
