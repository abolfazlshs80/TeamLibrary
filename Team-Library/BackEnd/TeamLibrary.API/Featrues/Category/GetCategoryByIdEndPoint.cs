using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;



public static class GetCategoryByIdEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/GetCategoryById/{{id:int}}", async (
                int id,
                ICategoryService service,
                HttpContext context
            ) =>
            {
                var category = await service.GetCategoryByIdAsync(id);

                if (category == null)
                    return NotFound("دسته‌بندی پیدا نشد");

                return Ok(category);
            })
            //.RequireAuthorization()
            .WithTags(ApiInfo.Tag);
        }
    }
}


//public static class GetCategoryByIdEndPoint
//{
//    public class EndPoint : BaseEndpoint, IEndpoint
//    {
//        public void MapEndpoint(IEndpointRouteBuilder app)
//        {
//            app.MapGet($"{ApiInfo.Prefix}/GetCategoryById", handler: async (
//                  int id,
//                ICategoryService service,
//                     HttpContext context
//                ) =>
//            {
//                ////validation
//                //(bool isValid, string errorMessage) resultError =
//                //               MapEndpointValidationResult<modeltype>.Validate(request);

//                //if (!resultError.isValid)
//                //    return BadRequest(resultError.errorMessage);
//                var categories = await service.GetCategoryByIdAsync(request);

//                return Ok(categories);

//            })
//                //.RequireAuthorization()
//                .WithTags(ApiInfo.Tag);
//        }
//    }
//}