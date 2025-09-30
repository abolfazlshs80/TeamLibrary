namespace TeamLibrary.API.Featrues.Account.DTOs.Request;

public class RegisterRequestDto
{
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}
public class ResetPasswordRequestDto
{
    public required string Email { get; set; }
    public required string Code { get; set; }
    public required string Password { get; set; }

}
public class ForgetPasswordRequestDto
{

    public  required string Email { get; set; }
}