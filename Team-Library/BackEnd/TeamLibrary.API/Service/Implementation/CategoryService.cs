using ErrorOr;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository.Interface;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Service.Interface;

namespace TeamLibrary.API.Service.Implementation
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<ErrorOr<string>> AddCategoryAsync(CreateCategoryDto category)
        {

            await _repository.AddCategoryAsync(new Category
            {
                Name = category.Name,
                Slug = category.Slug,
                Description = category.Description,
            });
          
            return "دسته بندی ثبت شد";

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
