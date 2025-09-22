namespace TeamLibrary.API.Data.Models
{
    public class Category : BaseEntity
    {


        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreateDateDatetime { get; set; }
        public DateTime? UpdateDateDatetime { get; set; }
        public List<Book> Books { get; set; } = new();
    }
}
