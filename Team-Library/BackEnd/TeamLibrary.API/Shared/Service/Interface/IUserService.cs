using DrMeet.Api.Shared.Persistence.UnitOfWork;
using ErrorOr;
using TeamLibrary.API.Featrues.Category.DTOs;

namespace TeamLibrary.API.Shared.Service.Interface;

public interface IUserService
{
    Task<ErrorOr<object>> GetUserDetails(int UserId);
}
public class UserService(IUnitOfWork unitOfWork) : IUserService
{
    public async Task<ErrorOr<object>> GetUserDetails(int UserId)
    {
        var user = await unitOfWork.Users.GetByIdAsync(UserId);
        if (user is null)
            return Error.NotFound("User.NotFound", "کاربر یافت نشد");

        return new
        {
            UserId = user.Id,
            UserName = user.UserName,
        };
    }
}