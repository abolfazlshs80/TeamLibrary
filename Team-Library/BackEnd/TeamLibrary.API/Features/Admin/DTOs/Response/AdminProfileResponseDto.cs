namespace TeamLibrary.API.Featrues.Admin.DTOs.Response
{
    public class AdminProfileResponseDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UserType { get; set; } = string.Empty;
        public DateTime LastLogin { get; set; }
        public AdminPermissionsDto Permissions { get; set; } = new();
    }

    public class AdminPermissionsDto
    {
        public bool CanManageBooks { get; set; } = true;
        public bool CanManageCategories { get; set; } = true;
        public bool CanViewReports { get; set; } = true;
        public bool CanManageUsers { get; set; } = true;
    }
}