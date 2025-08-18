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

        public async Task<bool> UpdateCategoryAsync(UpdateCategoryDto dto)
        {
            try
            {
                var category = await _repository.GetCategoryByIdAsync(dto.Id);
                if (category == null) return false;

                category.Name = dto.Name;
                category.Slug = dto.Slug;
                category.Description = dto.Description;

                await _repository.UpdateCategoryAsync(category);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


    }
}
