namespace TeamLibrary.API.Data.Models;

public class Book : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public int CategoryId { get; set; }
    public string ImagePath { get; set; } = null!;
    public string PdfPath { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int? UserId { get; set; }
    public int Rank { get; set; } 
    public int PublicationYear { get; set; } 
    public string Author { get; set; } 
    public int Pages { get; set; } 
    public decimal Price { get; set; } 
    public string Language { get; set; } 

    public Category Category { get; set; } = null!;
    public Users? User { get; set; }
}
