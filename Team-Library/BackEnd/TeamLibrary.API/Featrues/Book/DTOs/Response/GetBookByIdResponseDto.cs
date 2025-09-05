namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookByIdResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public int PublicationYear { get; set; }
        public int Pages { get; set; }
        public decimal Price { get; set; }
        public string Language { get; set; }
        public string ImagePath { get; set; }
        public string PdfPath { get; set; }
        public string CategoryName { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime? UpdateDateTime { get; set; }
    }
namespace TeamLibrary.API.Featrues.Book.DTOs.Response;

public class GetBookByIdResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public int PublicationYear { get; set; }
    public int Pages { get; set; }
    public decimal Price { get; set; }
    public string Language { get; set; }
    public string ImagePath { get; set; }
    public string PdfPath { get; set; }
    public string CategoryName { get; set; }
    public string Translators { get; set; }
}
public class GetBookBySlugResponseDto
{
    public string Title { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public int PublicationYear { get; set; }
    public int Pages { get; set; }
    public decimal Price { get; set; }
    public string Language { get; set; }
    public string ImagePath { get; set; }
    public string PdfPath { get; set; }
    public string CategoryName { get; set; }
    public string Translators { get; set; }
    public int Rank { get; set; }
}
