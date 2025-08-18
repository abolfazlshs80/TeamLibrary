using ErrorOr;
using Microsoft.EntityFrameworkCore;
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
            try
            {
                await _repository.AddCategoryAsync(new Category
                {
                    Name = category.Name?.Trim() ?? string.Empty,
                    Slug = category.Slug?.Trim() ?? string.Empty,
                    Description = category.Description
                });

                return "دسته بندی ثبت شد";
            }
            catch (DbUpdateException ex)
            {
                // بسته به ErrorOr شما، یکی از این‌ها:
                return Error.Failure(code: "DbError", description: ex.Message);
                // یا: return Error.Unexpected(description: "خطای دیتابیس");
            }
            catch (Exception ex)
            {
                return Error.Unexpected(description: ex.Message);
            }
        }



        public async Task DeleteCategoryByIdAsync(int categoryId)
        {
            var category = _repository.GetCategoryByIdAsync(categoryId);
            if (category == null) 
            {
                return;
            }
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
