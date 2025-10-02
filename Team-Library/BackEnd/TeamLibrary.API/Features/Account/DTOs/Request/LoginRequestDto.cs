using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Account.DTOs.Request;

public class LoginRequestDto
{
    [Required(ErrorMessage = "نام کاربری یا ایمیل الزامی است")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "رمز عبور الزامی است")]
    [MinLength(6, ErrorMessage = "رمز عبور باید حداقل 6 کاراکتر باشد")]
    public string Password { get; set; } = string.Empty;
}