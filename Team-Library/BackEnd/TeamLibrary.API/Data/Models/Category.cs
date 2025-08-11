namespace TeamLibrary.API.Data.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }

        public List<Book> Books { get; set; } = new();
    }
}
