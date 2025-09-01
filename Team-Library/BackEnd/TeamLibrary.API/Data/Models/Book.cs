namespace TeamLibrary.API.Data.Models;

public class Book : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string ImagePath { get; set; } = string.Empty;
    public string PdfPath { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? UserId { get; set; }
    public int Rank { get; set; } 
    public int PublicationYear { get; set; } 
    public string Author { get; set; } =string.Empty;
    public int Pages { get; set; } 
    public decimal Price { get; set; }
    public string Language { get; set; } = string.Empty;
    public string Translator { get; set; } = string.Empty;

    public Category Category { get; set; } = new();
    public Users? User { get; set; }
}
