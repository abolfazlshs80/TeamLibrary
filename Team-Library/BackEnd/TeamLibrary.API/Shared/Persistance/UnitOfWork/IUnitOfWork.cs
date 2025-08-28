using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository;

namespace DrMeet.Api.Shared.Persistence.UnitOfWork;

public interface IUnitOfWork
{
    IRepository<Category> Categories { get; }
    IRepository<Book> Books { get; } // اضافه کردن Books
}
