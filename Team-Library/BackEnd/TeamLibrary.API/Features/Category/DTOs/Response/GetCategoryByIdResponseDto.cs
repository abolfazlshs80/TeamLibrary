namespace TeamLibrary.API.Featrues.Category.DTOs;

public class GetCategoryByIdResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
}
