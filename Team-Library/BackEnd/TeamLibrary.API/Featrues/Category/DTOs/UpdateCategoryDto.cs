using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Category.DTOs;

public class UpdateCategoryDto
{
    [Required]
    public int Id { get; set; }   // 🔴 لازم برای شناسایی رکورد
    [Required(ErrorMessage =" لطفا نام را وارد کنید")]
    public string Name { get; set; } = string.Empty;
    [Required(ErrorMessage = " لطفا Slug را وارد کنید")]
    public string Slug { get; set; } = string.Empty;
    [Required(ErrorMessage = " لطفا شرح را وارد کنید")]
    public required string Description { get; set; }
}
