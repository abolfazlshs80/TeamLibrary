namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookListRequestDto
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public int? Rank { get; set; }
        public int? MinPageCount { get; set; }
        public int? MaxPageCount { get; set; }
        public string? Language { get; set; }
        public string? Author { get; set; }
        public string? Category { get; set; }
        public string? Search { get; set; }
    }
}
