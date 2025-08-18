using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Service.Interface;
using TeamLibrary.API.Shared.Contracts;
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
                return Results.BadRequest(resultError.errorMessage);

            var status = await service.AddCategoryAsync(request);

            // 🔴 اصلاح شرط:
            if (status.IsError)
                return Results.BadRequest(string.Join(",", status.Errors.Select(e => e.Description)));

            // فعلاً همون 200 OK چون سرویس string می‌ده
            return Results.Ok(status.Value);
        })
        //.RequireAuthorization()
        .WithTags(ApiInfo.Tag);
    }
}
