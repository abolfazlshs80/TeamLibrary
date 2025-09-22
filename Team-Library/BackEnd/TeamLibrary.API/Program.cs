using TeamLibrary.API.Shared.Middleware;
using TeamLibrary.API.Shared.Service.Implementation;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Extentions;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContextService(builder.Configuration);
builder.Services.AddMemoryCache();
builder.Services.AddScoped<IRateLimitService, RateLimitService>();

var app = builder.Build();


app.UseMiddleware<ExceptionHandlingMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapEndpoints();
app.Run();
