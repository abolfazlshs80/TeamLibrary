using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Account;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;
public static class DeleteCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapDelete($"{ApiInfo.Prefix}/Delete",
                async (ICategoryService categoryService,[FromBody] DeleteCategoryRequestDto request) =>
                {
                    var status = await categoryService.DeleteCategoryByIdAsync(request.Id);

                    if (status.IsError)
                        return BadRequest(status.Errors.GetMessageError());

                    return Ok(status.Value);
                }
            )
            .AddEndpointFilter(new ValidationFilter<DeleteCategoryRequestDto>())
            .WithTags(ApiInfo.Tag);

        }
    }
}
