using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

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
            // validation (اگه از همون ولیدیشن کاستوم استفاده می‌کنی)
            (bool isValid, string errorMessage) resultError =
                           MapEndpointValidationResult<CreateCategoryDto>.Validate(request);

            if (!resultError.isValid)
                return BadRequest(resultError.errorMessage);

            var status = await service.AddCategoryAsync(request);

            if (status.IsError)
                return BadRequest(string.Join(",", status.Errors.Select(e => e.Description)));

            return Ok(status.Value);
        })
  
        .WithTags(ApiInfo.Tag);
    }
}
