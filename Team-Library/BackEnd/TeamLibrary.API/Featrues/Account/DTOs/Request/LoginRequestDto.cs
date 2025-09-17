using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Account.DTOs.Request;

public class LoginRequestDto
{
    [Required(ErrorMessage = "توکن الزامی است")]
    [MinLength(10, ErrorMessage = "توکن نامعتبر است")]
    public string Token { get; set; } = string.Empty;
}