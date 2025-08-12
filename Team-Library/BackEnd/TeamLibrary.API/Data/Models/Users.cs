namespace TeamLibrary.API.Data.Models;

public class Users
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public List<Book> Books { get; set; } = new();
}