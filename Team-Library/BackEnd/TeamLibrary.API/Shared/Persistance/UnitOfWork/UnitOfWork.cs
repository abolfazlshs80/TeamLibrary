
using TeamLibrary.API.Data.Context;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository;

namespace DrMeet.Api.Shared.Persistence.UnitOfWork;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private IRepository<Category>? _categories;


    public IRepository<Category> Categories => _categories ??= new Repository<Category>(context);


}