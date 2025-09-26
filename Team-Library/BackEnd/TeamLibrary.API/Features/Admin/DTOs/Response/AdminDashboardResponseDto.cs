namespace TeamLibrary.API.Features.Admin.DTOs.Response;

public class AdminDashboardResponseDto
{
    public string AdminName { get; set; } = string.Empty;
    public AdminStatisticsDto Statistics { get; set; }

    public class AdminStatisticsDto
    {
        public int TotalBooks { get; set; }
        public int TotalCategories { get; set; }
        public int TotalViews { get; set; }
        public List<TopBookDto> TopViewedBooks { get; set; }
        public List<CategoryStatsDto> CategoryStats { get; set; }
    }

    public class TopBookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public int ViewCount { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }

    public class CategoryStatsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int BookCount { get; set; }
        public int TotalViews { get; set; }
    }
}