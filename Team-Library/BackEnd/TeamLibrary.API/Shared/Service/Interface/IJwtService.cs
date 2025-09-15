using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Shared.Service.Implementation;

namespace DrMeet.Api.Shared.Services.JwtService;

public interface IJwtService
{
    JwtToken CreateToken(int Id, UserType userType);
 
    string GetClaim(string token, string claimType);
    (UserType userType, int id) ExteractToken(string token);
}