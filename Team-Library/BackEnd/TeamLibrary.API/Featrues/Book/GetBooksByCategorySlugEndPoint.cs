using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Category;
using TeamLibrary.API.Shared.Contracts;

using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Book
{
    public static class GetBooksByCategorySlugEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/categories/{{slug}}/books", async (
                    string slug,
                    IBookService bookService
                ) =>
                {
                    if (string.IsNullOrWhiteSpace(slug))
                    {
                        return BadRequest("شناسه دسته‌بندی نمی‌تواند خالی باشد");
                    }

                    var books = await bookService.GetBooksByCategorySlugAsync(slug);
                    return Ok(books);
                })
                .AddEndpointFilter(new ValidationFilter<GetBooksByCategorySlugRequestDto>())
                .WithTags(ApiInfo.Tag);
            }
        }
    }
}