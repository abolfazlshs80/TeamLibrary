using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;

namespace TeamLibrary.API.Featrues.Book
{
    public static class UpdateBookEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapPut($"{ApiInfo.Prefix}/books/update",
                    async (IBookService bookService, [FromBody] UpdateBookRequestDto request) =>
                    {
                        var status = await bookService.UpdateBookAsync(request);

                        if (status.IsError)
                            return Results.BadRequest(status.Errors.GetMessageError());

                        return Results.Ok(status.Value);
                    }
                )
                .AddEndpointFilter(new ValidationFilter<UpdateBookRequestDto>())
                .WithTags(ApiInfo.Tag);
            }
        }
    }

}
