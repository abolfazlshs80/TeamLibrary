namespace TeamLibrary.API.Data.Models;

public class Users:BaseEntity
{

    public required string UserName { get; set; }
    public required string Password { get; set; }
    public List<Book> Books { get; set; } = new();
}