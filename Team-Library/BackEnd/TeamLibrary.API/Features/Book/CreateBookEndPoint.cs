using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Api;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Book
{
    namespace TeamLibrary.API.Featrues.Book
    {
        public static class CreateBookEndPoint
        {
            public class EndPoint : BaseEndpoint, IEndpoint
            {
                public void MapEndpoint(IEndpointRouteBuilder app)
                {
                    app.MapPost($"{ApiInfo.Prefix}/create",
                        async (/*[FromForm] */CreateBookRequestDto request, IBookService bookService) =>
                        {
                            if (!string.IsNullOrEmpty(request.Slug))
                            {
                                request.Slug = request.Slug.Trim().ToLower();
                            }
                            var status = await bookService.AddBookAsync(request);
                            if (status.IsError)
                                return BadRequest(status.FirstError.Description);
                            return Ok(AppMessages.Create);
                        })
                        //.DisableAntiforgery()
                        .AddEndpointFilter(new ValidationFilter<CreateBookRequestDto>())
                        .WithTags(ApiInfo.Tag);
                }
            }
        }
    }
}