namespace TeamLibrary.API.Data.Models;

public class Users : BaseEntity
{

    public required string UserName { get; set; }
    public string? FullName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public required string Password { get; set; }
    public List<Book> Books { get; set; } = new();
    public UserType UserType { get; internal set; }
}