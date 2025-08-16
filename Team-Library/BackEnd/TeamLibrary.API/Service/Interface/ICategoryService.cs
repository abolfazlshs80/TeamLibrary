using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Service.Interface
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoryAsync();
    }
}
