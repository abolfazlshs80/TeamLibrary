namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookByCategorySlugResponseDto
    {
         public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
       
    }
}