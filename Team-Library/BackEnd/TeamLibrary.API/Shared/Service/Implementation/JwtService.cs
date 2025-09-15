using DrMeet.Api.Shared.Services.JwtService;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Shared.Models;

namespace TeamLibrary.API.Shared.Service.Implementation;

public class JwtToken
{
    public string Token { get; set; } = null!;
    public DateTime ExpireDate { get; set; }
}

public static class CustomClaims
{
    public const string User = "UserId";

    public const string AccessLevel = "AccessLevel";
}

public class JwtService(IOptions<SiteSetting> options) : IJwtService
{

    public JwtToken CreateToken(int Id, UserType userType)
    {
        var expiredDate = DateTime.UtcNow.AddDays(1);

        var secretKey = options.Value.SecretKey;

        var claims = new List<Claim>
        {
            new(CustomClaims.User, Id.ToString()),
            new(CustomClaims.AccessLevel, nameof(userType))
        };


        var token = GenerateToken(claims, expiredDate, secretKey);

        return new JwtToken
        {
            Token = token,
            ExpireDate = expiredDate
        };
    }

    public string GetClaim(string token, string claimType)
    {
        try
        {
            token = token.Replace("Bearer", "", StringComparison.OrdinalIgnoreCase).Trim();
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Value.SecretKey)),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);

            return claims.FindFirst(s => s.Type == claimType).ValueType;
        }
        catch (Exception ex)
        {
            return string.Empty;
        }
    }

    private string GenerateToken(List<Claim> claims, DateTime expiredDate, string secretKey)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expiredDate,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public (UserType userType,int id) ExteractToken(string token)
    {
        try
        {
            token = token.Replace("Bearer", "", StringComparison.OrdinalIgnoreCase).Trim();
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Value.SecretKey)),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            UserType res = claims.Claims.FirstOrDefault().Type switch
            {
                CustomClaims.User => UserType.USER,
             
                _ => UserType.NONE,
            };
            return (res, int.Parse(claims.Claims.FirstOrDefault().Value));
        }
        catch (Exception)
        {

          return (UserType.NONE, 0);
        }
     

        
    }


}