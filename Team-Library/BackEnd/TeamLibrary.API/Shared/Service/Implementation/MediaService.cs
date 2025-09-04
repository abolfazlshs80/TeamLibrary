using ErrorOr;
using TeamLibrary.API.Shared.Models.Enums;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

public class MediaService : IMediaService
{
    private readonly IWebHostEnvironment _environment;

    public MediaService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<ErrorOr<string>> UploadImageAsync(IFormFile file, FolderImagesType folderType)
    {
        try
        {
            if (file == null || file.Length == 0)
                return Error.Validation("File", "No file was uploaded");

            // Validate file size
            var fileUploadManager = new FileUploadManager();
            if (!fileUploadManager.ValidationSizeFile(file))
                return Error.Validation("File", "File size exceeds the maximum limit ");

            // Use the existing FileUploadManager to handle the upload
            var uploadedPath = await FileUploadManager.UploadAsync(file, folderType);

            if (string.IsNullOrEmpty(uploadedPath))
                return Error.Failure("Upload", "Failed to upload file");

            return uploadedPath;
        }
        catch (Exception ex)
        {
            return Error.Failure("Upload", ex.Message);
        }
    }

    public async Task<ErrorOr<bool>> DeleteImageAsync(string imagePath)
    {
        try
        {
            if (string.IsNullOrEmpty(imagePath))
                return Error.Validation("Path", "Image path is required");

            var result = await FileUploadManager.DeleteAsync(imagePath);
            return result;
        }
        catch (Exception ex)
        {
            return Error.Failure("Delete", ex.Message);
        }
    }

    public string GetImageUrl(string imagePath)
    {
        if (string.IsNullOrEmpty(imagePath))
            return string.Empty;

        var relativePath = imagePath.Replace(_environment.WebRootPath, "")
                                  .Replace("\\", "/")
                                  .TrimStart('/');

        return relativePath;
    }
}