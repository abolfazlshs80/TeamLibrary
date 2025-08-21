

using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Data.Repository;

public interface IRepository<T> where T : BaseEntity
{
    IQueryable<T> AsQueryable();
    Task<List<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T entity);
    
    Task AddRangeAsync(ICollection<T> entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task DeleteAsync();
 
}
