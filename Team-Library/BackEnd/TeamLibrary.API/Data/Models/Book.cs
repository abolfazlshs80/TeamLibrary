namespace TeamLibrary.API.Data.Models;

public class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;
    public string Slug { get; set; } = null!;

    public int CategoryId { get; set; }


    public int? UserId { get; set; }

    public Category Category { get; set; } = null!;
    public Users? User { get; set; }
}
