using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Api;

namespace TeamLibrary.API.Featrues.Book
{
    public class GetTopRatedBooksEndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/top-rated",
                async (IBookService bookService) =>
                {
                    try
                    {
                        var books = await bookService.GetTopRatedBooksAsync();
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