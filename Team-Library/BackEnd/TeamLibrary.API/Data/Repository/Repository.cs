

using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Context;
using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Data.Repository;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public IQueryable<T> AsQueryable() => _dbSet.AsQueryable();

    public async Task<List<T>> GetAllAsync() => await _dbSet.ToListAsync();

    public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task AddRangeAsync(ICollection<T> entity)
    {
        await _dbSet.AddRangeAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync()
    {
        var allEntities = await _dbSet.ToListAsync();
        _dbSet.RemoveRange(allEntities);
        await _context.SaveChangesAsync();
    }

   

   
}
