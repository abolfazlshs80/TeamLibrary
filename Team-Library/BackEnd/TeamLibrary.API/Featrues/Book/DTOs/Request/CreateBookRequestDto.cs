using System.ComponentModel.DataAnnotations;

namespace TeamLibrary.API.Featrues.Book.DTOs.Request
{
    public class CreateBookRequestDto
    {
        [Required(ErrorMessage = "عنوان کتاب الزامی است.")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "شناسه دسته‌بندی الزامی است.")]
        public int CategoryId { get; set; }

        //[Required(ErrorMessage = "تصویر کتاب الزامی است.")]
        public string ImagePath { get; set; }

        //[Required(ErrorMessage = "فایل PDF کتاب الزامی است.")]
        public string PdfPath { get; set; } 

        [Required(ErrorMessage = "توضیحات کتاب الزامی است.")]
        public string Description { get; set; } = null!;
           
        public int Rank { get; set; } 

        [Required(ErrorMessage = "سال انتشار الزامی است.")]
        public int PublicationYear { get; set; }

        [Required(ErrorMessage = "نام نویسنده الزامی است.")]
        public string Author { get; set; } = null!;

        [Required(ErrorMessage = "تعداد صفحات الزامی است.")]
        public int Pages { get; set; }

        [Required(ErrorMessage = "قیمت الزامی است.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "زبان کتاب الزامی است.")]
        public string Language { get; set; } = null!;

        [Required(ErrorMessage = "اسلاگ کتاب الزامی است.")]
        public string Slug { get; set; } = null!;
        [Required(ErrorMessage = "اسلاگ کتاب الزامی است.")]
        public string Translator { get; set; } = null!;

    }
}
