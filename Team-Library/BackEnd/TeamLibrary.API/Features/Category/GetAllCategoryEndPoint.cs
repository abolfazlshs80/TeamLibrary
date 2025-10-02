using Azure.Core;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Featrues.Category.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;
using TeamLibrary.API.Shared.PagedList;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

public static class GetAllCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/GetAllCategory", handler: async (
                ICategoryService service,
              [AsParameters] GetCategoryListRequestDto request,
                     HttpContext context
                ) =>
            {

                var categories = await service.GetAllCategoryAsync(request);
                return Ok(categories);

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }


    }
}