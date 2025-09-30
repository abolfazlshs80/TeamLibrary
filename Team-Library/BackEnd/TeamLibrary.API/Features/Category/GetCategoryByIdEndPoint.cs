using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Featrues.Category.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;



public static class GetCategoryByIdEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {

            app.MapGet($"{ApiInfo.Prefix}/GetById", handler: async (
                ICategoryService service,
              [AsParameters] GetCategoryByIdRequestDto request,
                     HttpContext context
                ) =>
            {

                var category = await service.GetCategoryByIdAsync(request.Id);

                if (category == null)
                    return BadRequest("دسته‌بندی پیدا نشد");

                return Ok(category);

            })
            .AddEndpointFilter(new ValidationFilter<GetCategoryByIdRequestDto>())
            .WithTags(ApiInfo.Tag);

        }

    }
}

