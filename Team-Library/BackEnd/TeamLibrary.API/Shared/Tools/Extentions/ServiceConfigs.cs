using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace TeamLibrary.API.Shared.Tools.Extentions;

public static class ServiceConfigs
{
    public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpContextAccessor();
        
        #region Data
        
 

        #endregion

        #region Services

        #endregion


      
        
        services.AddEndpoints(typeof(Program).Assembly);

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(opt =>
        {
            opt.CustomSchemaIds(s => s.FullName?.Replace("+", "."));
            opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Description = "JWT Authorization header using the Bearer scheme.",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer"
            });
            //opt.AddSecurityRequirement(new OpenApiSecurityRequirement
            //{
            //    {
            //        new OpenApiSecurityScheme
            //        {
            //            Reference = new OpenApiReference
            //            {
            //                Id = "Bearer",
            //                Type = ReferenceType.SecurityScheme
            //            }
            //        },
            //        Array.Empty<string>()
            //    }
            //});
        });
        services.AddAuthorization();
         //services.Configure<SiteSetting>(options =>
         //   configuration.GetSection("Setting").Bind(options));
         
         
        // services.AddDbContext<ApplicationDbContext>
        //      (opt => opt.UseSqlServer(conf.GetConnectionString("DeafultConnection")));
        // services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        //services.AddAutoMapper(typeof(Program).Assembly); 
       // services.AddValidatorsFromAssemblyContaining<Program>();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
         {
             //options.TokenValidationParameters = new TokenValidationParameters
             //{
             //    ValidateIssuer = false,
             //    ValidateAudience = false,
             //    ValidateLifetime = true,
             //    ValidateIssuerSigningKey = true,
             //    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Setting:SecretKey").Value!))
             //};
         });

        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
    }
}