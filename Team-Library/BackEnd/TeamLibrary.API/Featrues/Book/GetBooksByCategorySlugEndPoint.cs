using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Category;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Featrues.Book
{
    public static class GetBooksByCategorySlugEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/GetBooksByCategorySlug", async (
                    IBookService bookService,
                    [AsParameters] GetBooksByCategorySlugRequestDto request,
                    HttpContext context
                ) =>
                {
                    var books = await bookService.GetBooksByCategorySlugAsync(request.Slug);
                    if (books == null || !books.Any())
                        return NotFound("????? ???? ??? ????????? ???? ???");
                    return Ok(books);
                })
                .AddEndpointFilter(new ValidationFilter<GetBooksByCategorySlugRequestDto>())
                .WithTags(ApiInfo.Tag);
            }
        }
    }
}