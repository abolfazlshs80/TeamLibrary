using TeamLibrary.API.Featrues.Book.DTOs.Response;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Featrues.Book
{
    public static class GetAllBooksEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/GetAllBooks", handler: async (
                    IBookService service,
                    [AsParameters] GetBookListRequestDto request,
                    HttpContext context
                ) =>
                {
                    var books = await service.GetAllBooksAsync(request);
                    return Ok(books);
                })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
            }
        }
    }

}
