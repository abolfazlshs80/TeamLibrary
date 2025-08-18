using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Service.Interface;

namespace TeamLibrary.API.Endpoints
{
    public static class CategoryEndpoints
    {
        public static void MapCategoryEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/categories");

            group.MapGet("/", async (ICategoryService service) =>
            {
                var categories = await service.GetAllCategoryAsync();
                return Results.Ok(categories);
            });

            group.MapGet("/{id:int}", async (int id, ICategoryService service) =>
            {
                var category = await service.GetCategoryByIdAsync(id);
                return category is not null ? Results.Ok(category) : Results.NotFound();
            });

            //group.MapPost("/", async (Category category, ICategoryService service) =>
            //{
            //    await service.AddCategoryAsync(category);
            //    return Results.Created($"/api/categories/{category.Id}", category);
            //});

            //group.MapPut("/{id:int}", async (int id, Category category, ICategoryService service) =>
            //{
            //    if (id != category.Id)
            //        return Results.BadRequest("Id mismatch");

            //    await service.UpdateCategoryAsync(category);
            //    return Results.NoContent(); 
            //});

            group.MapDelete("/{id:int}", async (int id, ICategoryService service) =>
            {
                await service.DeleteCategoryByIdAsync(id);
                return Results.NoContent(); 
            });
        }
    }
}
