using ErrorOr;
using TeamLibrary.API.Shared.Models.Enums;

namespace TeamLibrary.API.Shared.Service.Interface
{
    public interface IMediaService
    {
        Task<ErrorOr<string>> UploadImageAsync(IFormFile file, FolderImagesType folderType);
        Task<ErrorOr<bool>> DeleteImageAsync(string imagePath);
        string GetImageUrl(string imagePath);
    }


}
