using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Service.Interface;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

public static class CreateCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost($"{ApiInfo.Prefix}/CreateCategory", handler: async (
               [FromBody] CreateCategoryDto request,
                ICategoryService service,
                     HttpContext context
                ) =>
            {
                //validation
                //(bool isValid, string errorMessage) resultError =
                //               MapEndpointValidationResult<CreateCategoryDto>.Validate(request);

                //if (!resultError.isValid)
                //    return BadRequest(resultError.errorMessage);


                var status = await service.AddCategoryAsync(request);
                if (!status.IsError)
                    return BadRequest(string.Join(",", status.Errors.Select(a => a.Description)));
                else
                    return Ok(status.Value);

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }
    }
}