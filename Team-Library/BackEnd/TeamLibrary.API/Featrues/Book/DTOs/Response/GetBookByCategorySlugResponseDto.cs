namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookByCategorySlugResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string PdfPath { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}