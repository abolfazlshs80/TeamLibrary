using ErrorOr;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Account.DTOs.Request;

namespace TeamLibrary.API.Shared.Service.Interface;

public interface IUserService
{
    Task<ErrorOr<object>> GetUserDetails(int UserId);
    Task<ErrorOr<bool>> ForgetPassword(ForgetPasswordRequestDto request);
    Task<ErrorOr<bool>> ResetPassword(ResetPasswordRequestDto request);
    Task<ErrorOr<Users>> AuthorizeAsync(string token);
    Task<ErrorOr<Users>> GetUserByEmailAsync(string email);
    Task<ErrorOr<Users>> AuthenticateUserAsync(string userNameOrEmail, string password);
    Task<ErrorOr<Users>> RegisterAsync(string userName, string fullName, string password, string email);
}
