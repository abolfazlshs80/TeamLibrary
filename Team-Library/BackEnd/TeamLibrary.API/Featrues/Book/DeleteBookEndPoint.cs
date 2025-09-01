using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;

namespace TeamLibrary.API.Featrues.Book
{
    public static class DeleteBookEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapDelete($"{ApiInfo.Prefix}/books/Delete",
                    async (IBookService bookService, [FromBody] DeleteBookRequestDto request) =>
                    {
                        var status = await bookService.DeleteBookByIdAsync(request.Id);

                        if (status.IsError)
                            return Results.BadRequest(status.Errors.GetMessageError());

                        return Results.Ok(status.Value);
                    }
                )
                .AddEndpointFilter(new ValidationFilter<DeleteBookRequestDto>())
                .WithTags(ApiInfo.Tag);
            }
        }
    }

}
