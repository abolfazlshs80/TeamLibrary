using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Category.DTOs;

public class DeleteCategoryRequestDto
{
    [Required(ErrorMessage = "شناسه دسته‌بندی الزامی است")]
    public int Id { get; set; }

}
