using TeamLibrary.API.Featrues.Admin.DTOs.Request;
using TeamLibrary.API.Featrues.Admin.DTOs.Response;

namespace TeamLibrary.API.Shared.Service.Interface;

public interface IAdminService
{
    Task<AdminDashboardResponseDto> GetAdminDashboardAsync(GetAdminDashboardRequestDto request);
    Task<AdminProfileResponseDto?> GetAdminProfileAsync(int userId);
    Task<bool> IsUserAdminAsync(int userId);
    Task<string> GetAdminNameAsync(int userId);
}
