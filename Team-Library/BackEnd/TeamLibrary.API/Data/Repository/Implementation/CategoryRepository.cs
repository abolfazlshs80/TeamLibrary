using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Context;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository.Interface;

namespace TeamLibrary.API.Data.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddCategoryAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(Category category)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryByIdAsync(Category category)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }


        public Task<bool> ExistsBySlugAsync(string slug)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Category>> GetAllCategoryAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public Task<Category> GetCategoryByIdAsync(int id)
        {
            return _context.Categories.FirstAsync(c => c.Id == id);
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();

        }
    }
}
