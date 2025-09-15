using System.Security.Claims;
using TeamLibrary.API.Data.Models;

namespace TeamLibrary.API.Shared.Tools.Extentions;

public static class IdentityExtentions
{
    public static string GetId(this ClaimsPrincipal? user, UserType type)

    {
        if (user == null)
            return null;
        return user.FindFirst(type.ToString() + "Id")?.Value;
    }
}