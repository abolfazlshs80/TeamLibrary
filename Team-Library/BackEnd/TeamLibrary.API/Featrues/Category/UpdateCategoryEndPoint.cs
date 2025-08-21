using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

public static class UpdateCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
 
            app.MapPut($"{ApiInfo.Prefix}/Update",
                async (ICategoryService categoryService, [FromBody] UpdateCategoryRequestDto request) =>
                {
                    var status = await categoryService.UpdateCategoryAsync(request);

                    if (status.IsError)
                        return BadRequest(status.Errors.GetMessageError());

                    return Ok(status.Value);
                }
            )
            .AddEndpointFilter(new ValidationFilter<UpdateCategoryRequestDto>())
            .WithTags(ApiInfo.Tag);

        }
    }
}