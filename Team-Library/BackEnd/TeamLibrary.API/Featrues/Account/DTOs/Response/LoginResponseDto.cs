using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Featrues.Account.DTOs.Response;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public DateTime ExpireDate { get; set; }
    public UserType UserType { get; set; }
    public string Email { get; set; } = string.Empty;
    public int UserId { get; set; }
}