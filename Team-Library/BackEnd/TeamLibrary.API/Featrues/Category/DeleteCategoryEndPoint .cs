using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Account;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Service.Interface;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;
public static class DeleteCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapDelete($"{ApiInfo.Prefix}/DeleteCategory", async (
                [FromBody] DeleteCategoryDto request,
                ICategoryService service,
                HttpContext context
            ) =>
            {
                // اعتبارسنجی
                (bool isValid, string errorMessage) resultError =
                               MapEndpointValidationResult<DeleteCategoryDto>.Validate(request);

                if (!resultError.isValid)
                    return Results.BadRequest(resultError.errorMessage);

                var result = await service.DeleteCategoryByIdAsync(request.Id);

                if (result.IsError)
                    return Results.BadRequest(string.Join(",", result.Errors.Select(e => e.Description)));

                return Results.Ok("دسته‌بندی حذف شد");
            })
            //.RequireAuthorization()
            .WithTags(ApiInfo.Tag);
        }
    }
}
