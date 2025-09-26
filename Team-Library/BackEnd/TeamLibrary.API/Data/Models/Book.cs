namespace TeamLibrary.API.Data.Models;

public class Book : BaseEntity
{
    public string Title { get; set; }
    public string Slug { get; set; }
    public int CategoryId { get; set; }
    public string ImagePath { get; set; }
    public string PdfPath { get; set; }
    public string Description { get; set; }
    public int? UserId { get; set; }
    public int Rank { get; set; }
    public string? Translator { get; set; } = string.Empty;
    public int PublicationYear { get; set; }
    public string Author { get; set; }
    public int Pages { get; set; }
    public decimal Price { get; set; }
    public string Language { get; set; }
<<<<<<< HEAD
=======
    public int ViewCount { get; set; } = 0;
>>>>>>> 41dcbf09c5b07749dc41df22db885d371ae92133
    public DateTime CreateDateDatetime { get; set; }
    public DateTime? UpdateDateDatetime { get; set; }
    public Category Category { get; set; }
    public Users? User { get; set; }
    public Book()
    {
        CreateDateDatetime = DateTime.Now;
        UpdateDateDatetime = DateTime.Now;
    }
}
