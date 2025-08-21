using ErrorOr;

namespace TeamLibrary.API.Shared.Tools.Extentions;

public static class ErrorOrExtention4
{
    public static string GetMessageError(this List<Error> Errors) => string.Join(",", Errors.Select(e => e.Description));
}
