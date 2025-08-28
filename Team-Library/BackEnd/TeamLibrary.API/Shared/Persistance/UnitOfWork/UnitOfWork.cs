
using TeamLibrary.API.Data.Context;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository;

namespace DrMeet.Api.Shared.Persistence.UnitOfWork;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private IRepository<Category>? _categories;
    private IRepository<Book>? _books;


    public IRepository<Category> Categories => _categories ??= new Repository<Category>(context);

    public IRepository<Book> Books => _books ??= new Repository<Book>(context);
}