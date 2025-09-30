using Azure.Core;
using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Featrues.Category.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Api;
using TeamLibrary.API.Shared.Tools.Extentions;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

public class EndPoint : BaseEndpoint, IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {

        app.MapPost($"{ApiInfo.Prefix}/Create",
            async (ICategoryService categoryService, [FromBody] CreateCategoryRequestDto request) =>
            {
                var status = await categoryService.AddCategoryAsync(request);

                if (status.IsError)
                    return BadRequest(status.Errors.GetMessageError());

                return Ok(status.Value);
            }
        )
        .AddEndpointFilter(new ValidationFilter<CreateCategoryRequestDto>())
        .WithTags(ApiInfo.Tag);
    }
}
