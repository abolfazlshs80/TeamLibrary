using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Book.DTOs.Request
{
    public class UpdateBookRequestDto
    {
        [Required(ErrorMessage = "شناسه کتاب الزامی است.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "عنوان کتاب الزامی است.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Slug الزامی است.")]
        public string Slug { get; set; } = string.Empty;

        [Required(ErrorMessage = "شناسه دسته‌بندی الزامی است.")]
        public int CategoryId { get; set; }

        //[Required(ErrorMessage = "فایل PDF کتاب الزامی است.")]
        public string PdfPath { get; set; } = string.Empty;

        [Required(ErrorMessage = "توضیحات کتاب الزامی است.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "رتبه کتاب الزامی است.")]
        [Range(1, 5, ErrorMessage = "رتبه باید بین 1 تا 5 باشد.")]
        public int Rank { get; set; }

        [Required(ErrorMessage = "سال انتشار الزامی است.")]
        public int PublicationYear { get; set; }

        [Required(ErrorMessage = "نام نویسنده الزامی است.")]
        public string Author { get; set; } = string.Empty;

        [Required(ErrorMessage = "تعداد صفحات الزامی است.")]
        public int Pages { get; set; }

        [Required(ErrorMessage = "قیمت الزامی است.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "زبان کتاب الزامی است.")]
        public string Language { get; set; } = string.Empty;
    }

}
