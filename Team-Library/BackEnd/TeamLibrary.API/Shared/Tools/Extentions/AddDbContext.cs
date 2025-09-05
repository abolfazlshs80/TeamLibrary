using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TeamLibrary.API.Data.Context;

namespace TeamLibrary.API.Shared.Tools.Extentions
{
    public static class AddDbContext
    {
        public static IServiceCollection AddDbContextService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                     options.UseSqlServer(configuration.GetConnectionString("LibraryConnection")));

            return services;
        }
    }
}
