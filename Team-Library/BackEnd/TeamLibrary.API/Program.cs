
using TeamLibrary.API.Data.Repository.Implementation;
using TeamLibrary.API.Data.Repository.Interface;
using TeamLibrary.API.Endpoints;
using TeamLibrary.API.Service.Implementation;
using TeamLibrary.API.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;
using TeamLibrary.API.Tools.Extentions;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContextService(builder.Configuration);

#region  Add Services DIP

builder.Services.AddScoped<ICategoryRepository,CategoryRepository>();
builder.Services.AddScoped<ICategoryService,CategoryService>();

#endregion

var app = builder.Build();

// Map Endpoints
app.MapCategoryEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapEndpoints();
app.Run();
