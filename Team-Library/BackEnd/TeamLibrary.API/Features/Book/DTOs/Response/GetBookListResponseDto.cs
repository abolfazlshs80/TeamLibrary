namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookListResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public DateTime CreateDateTime { get; set; }
        public DateTime? UpdateDateTime { get; set; }
        public string ImageUrl { get; internal set; }
        public int Rank { get; set; }
        public string? Search { get; set; }
        public int? MinPageCount { get; set; }
        public int? MaxPageCount { get; set; }
        public string? Language { get; set; }
    }
}
