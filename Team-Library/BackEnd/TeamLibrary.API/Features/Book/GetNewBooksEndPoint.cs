using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Api;

namespace TeamLibrary.API.Featrues.Book
{
    public class GetNewBooksEndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/new",
                async (IBookService bookService) =>
                {
                    try
                    {
                        var books = await bookService.GetNewBooksAsync();
                        return Ok(books);
                    }
                    catch (Exception e)
                    {
                        return BadRequest(e.Message);
                    }
                })
                .WithTags(ApiInfo.Tag);
        }
    }
}