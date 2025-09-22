using TeamLibrary.API.Shared.Models.Enums;

namespace TeamLibrary.API.Shared.Tools.Helper;
public class FileUploadManager
{
    public static async Task<string> UploadAsync(IFormFile file, FolderImagesType type)
    {
        if (file == null)
            return string.Empty;
        string _path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\Uploads\\" + type.ToString() + "\\");
        string filename = Guid.NewGuid().ToString() + Path.GetExtension(file?.FileName);
        if (!Directory.Exists(_path))
            Directory.CreateDirectory(_path);

        var filePath = Path.Combine(_path, filename);
        await using var strem = File.Create(filePath);
        await file.CopyToAsync(strem);

        return _path + filename;
    }
    public static async Task<bool> DeleteAsync(string path)
    {

        if (File.Exists(path))
        {
            File.Delete(path);
            return true;
        }

        return false;
    }

    public bool ValidationSizeFile(IFormFile file)
    {
        if (file != null && file.Length > 2048000000)
        {
            return false;
        }
        return true;
    }

}
