using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Category;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;

namespace TeamLibrary.API.Featrues.Book
{
    public static class CreateBookEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapPost($"{ApiInfo.Prefix}/books/create",
                    async ([FromBody] CreateBookRequestDto request, IBookService bookService) =>
                    {
                        var status = await bookService.AddBookAsync(request);

                        if (status.IsError)
                            return Results.BadRequest(status.Errors.GetMessageError());

                        return Results.Ok(status.Value);
                    })
                    .AddEndpointFilter(new ValidationFilter<CreateBookRequestDto>())
                    .WithTags(ApiInfo.Tag);
            }
        }
    }

}