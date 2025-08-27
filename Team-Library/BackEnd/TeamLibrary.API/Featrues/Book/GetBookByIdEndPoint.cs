using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Book.DTOs.Request;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Featrues.Category.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Book;



public static class GetBookByIdEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {

            app.MapGet($"{ApiInfo.Prefix}/GetById", handler: async (
                IBookService service,
              [AsParameters] GetBookByIdRequestDto request,
                     HttpContext context
                ) =>
            {

                var book = await service.GetBookByIdForShowDetailAsync(request.Id);

                if (book == null)
                    return BadRequest("کتاب پیدا نشد");

                return Ok(book);

            })
            .AddEndpointFilter(new ValidationFilter<GetBookByIdRequestDto>())
            .WithTags(ApiInfo.Tag);

        }

    }
}

