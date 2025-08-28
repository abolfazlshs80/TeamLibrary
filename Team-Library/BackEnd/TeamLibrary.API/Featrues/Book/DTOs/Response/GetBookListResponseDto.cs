namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookListResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
    }
}
