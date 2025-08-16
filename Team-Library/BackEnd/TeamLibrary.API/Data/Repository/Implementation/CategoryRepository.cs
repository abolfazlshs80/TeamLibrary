using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Context;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository.Interface;

namespace TeamLibrary.API.Data.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private  AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
                _context = context;
        }

        public async Task<List<Category>> GetAllCategoryAsync()
        {
            return await  _context.Categories.ToListAsync();
        }

        public Task<Category> GetCategoryByIdAsync(int id)
        {
            return _context.Categories.FirstAsync(c => c.Id == id);
        }
    }
}
