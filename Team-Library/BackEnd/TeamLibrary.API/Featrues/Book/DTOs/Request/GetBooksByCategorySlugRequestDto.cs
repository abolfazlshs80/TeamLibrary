using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Book.DTOs.Request
{
    public class GetBooksByCategorySlugRequestDto
    {
        [Required(ErrorMessage = "???? slug ????????? ?? ???? ????")]
        public string Slug { get; set; } = string.Empty;
    }
}