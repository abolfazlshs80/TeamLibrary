using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Category.DTOs;

public class GetCategoryByIdRequestDto
{
    //[Required(ErrorMessage = " لطفا شناسه را وارد کنید")]
    public int Id { get; set; }

 
}
