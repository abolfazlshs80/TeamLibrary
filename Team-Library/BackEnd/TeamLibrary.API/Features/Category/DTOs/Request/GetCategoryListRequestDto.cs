using System.ComponentModel.DataAnnotations;
using TeamLibrary.API.Shared.PagedList;

namespace TeamLibrary.API.Featrues.Category.DTOs.Request;

public class GetCategoryListRequestDto: PagedParamData
{
    public string? Name { get; set; }
    public string? Slug { get; set; }
}
