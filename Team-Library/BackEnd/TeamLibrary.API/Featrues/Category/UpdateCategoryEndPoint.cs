using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Service.Interface;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

public static class UpdateCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost($"{ApiInfo.Prefix}/UpdateCategory", handler: async (
               [FromBody] UpdateCategoryDto request,
                ICategoryService service,
                     HttpContext context
                ) =>
            {
                ////validation
                //(bool isValid, string errorMessage) resultError =
                //               MapEndpointValidationResult<CreateCategoryDto>.Validate(request);

                //if (!resultError.isValid)
                //    return BadRequest(resultError.errorMessage);


                var status = await service.UpdateCategoryAsync(request);
                if (status)
                    return Ok("بروزرسانی انجام شد");
                else
                    return BadRequest("بروزرسانی انجام نشد");

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }
    }
}