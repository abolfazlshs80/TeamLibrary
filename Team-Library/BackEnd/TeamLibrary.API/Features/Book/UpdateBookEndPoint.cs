using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Api;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Book
{
    public static class UpdateBookEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapPut($"{ApiInfo.Prefix}/update",
                    async ( UpdateBookRequestDto request, IBookService bookService) =>
                    {

                        var status = await bookService.UpdateBookAsync(request);
                        if (status.IsError)
                        {
                            return BadRequest(status.FirstError.Description);
                        }
                        return Ok(AppMessages.Edit);

                    }
                )
            
                .AddEndpointFilter(new ValidationFilter<UpdateBookRequestDto>())
                .WithTags(ApiInfo.Tag);
            }
        }
    }
}