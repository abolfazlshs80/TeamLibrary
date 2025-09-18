using DrMeet.Api.Shared.Persistence.UnitOfWork;
using DrMeet.Api.Shared.Services.JwtService;
using ErrorOr;
using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Shared.Service.Interface;

public interface IUserService
{
    Task<ErrorOr<object>> GetUserDetails(int UserId);
    Task<ErrorOr<Users>> AuthorizeAsync(string token);
    Task<ErrorOr<Users>> GetUserByEmailAsync(string email);
    Task<ErrorOr<Users>> AuthenticateUserAsync(string userName, string email, string password);
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

    public async Task<ErrorOr<Users>> GetUserByEmailAsync(string email)
    {
        try
        {
            var user = await unitOfWork.Users.AsQueryable()
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user is null)
            {
                return Error.NotFound("User.NotFound", "کاربر یافت نشد");
            }

            return user;
        }
        catch (Exception ex)
        {
            return Error.Failure("GetUserByEmail", ex.Message);
        }
    }

    public async Task<ErrorOr<Users>> AuthenticateUserAsync(string userName, string email, string password)
    {
        try
        {
            var user = await unitOfWork.Users.AsQueryable()
                .FirstOrDefaultAsync(u => u.UserName == userName && u.Email == email && u.Password == password);

            if (user is null)
            {
                return Error.Unauthorized("User.NotFound", "نام کاربری یا ایمیل نامعتبر است");
            }

            if (password is null)
            {
                return Error.Unauthorized("Password.Invalid", "رمز عبور نامعتبر است");
            }

            return user;
        }
        catch (Exception ex)
        {
            return Error.Failure("AuthenticateUser", ex.Message);
        }
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