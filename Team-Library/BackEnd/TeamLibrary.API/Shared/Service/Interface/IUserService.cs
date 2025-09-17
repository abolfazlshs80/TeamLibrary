using DrMeet.Api.Shared.Persistence.UnitOfWork;
using DrMeet.Api.Shared.Services.JwtService;
using ErrorOr;
using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Shared.Service.Interface;

public interface IUserService
{
    Task<ErrorOr<object>> GetUserDetails(int UserId);
    Task<ErrorOr<Users>> AuthorizeAsync(string token);
    Task<ErrorOr<Users>> GetUserByEmailAsync(string email);
}
public class UserService(IUnitOfWork unitOfWork, IJwtService jwtService) : IUserService
{
    public async Task<ErrorOr<Users>> AuthorizeAsync(string token)
    {
        try
        {
            var (userType, userId) = jwtService.ExteractToken(token);

            if (userType == UserType.NONE || userId <= 0)
            {
                return Error.Unauthorized("Token.Invalid", "توکن نامعتبر است");
            }

            var user = await unitOfWork.Users.GetByIdAsync(userId);
            if (user is null)
            {
                return Error.NotFound("User.NotFound", "کاربر یافت نشد");
            }

            if (user.UserType != userType)
            {
                return Error.Unauthorized("Token.UserTypeMismatch", "نوع کاربر در توکن مطابقت ندارد");
            }

            return user;
        }
        catch (Exception)
        {
            return Error.Unauthorized("Token.Invalid", "توکن نامعتبر است");
        }
    }

    public Task<ErrorOr<Users>> GetUserByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }

    public async Task<ErrorOr<object>> GetUserDetails(int UserId)
    {
        var user = await unitOfWork.Users.GetByIdAsync(UserId);
        if (user is null)
            return Error.NotFound("User.NotFound", "کاربر یافت نشد");

        return new
        {
            UserId = user.Id,
            UserName = user.UserName,
            FullName = user.FullName,
            Email = user.Email,
        };
    }
}