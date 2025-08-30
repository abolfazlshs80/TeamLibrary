using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Category.DTOs;

public class CreateCategoryRequestDto
{
    [Required(ErrorMessage =" لطفا نام را وارد کنید")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "لطفا Slug را وارد کنید")]
    public string Slug { get; set; } = string.Empty;

    [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
    [Display(Name ="توضیحات")]
    public string? Description { get; set; }
}
