using TeamLibrary.API.Shared.PagedList;

namespace TeamLibrary.API.Featrues.Book.DTOs.Response
{
    public class GetBookListRequestDto : PagedParamData
    {
        public string? Title { get; set; }
        public string? Slug { get; set; }
        public int? Rank { get; set; }
        public int? MinPageCount { get; set; }
        public int? MaxPageCount { get; set; }
        public string? Language { get; set; }
        public string? Author { get; set; }
        public string? Category { get; set; }
        public string? Search { get; set; }
    }
}
