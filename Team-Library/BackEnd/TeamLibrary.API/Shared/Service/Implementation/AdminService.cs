using Microsoft.EntityFrameworkCore;
using TeamLibrary.API.Data.Context;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Features.Admin.DTOs.Request;
using TeamLibrary.API.Features.Admin.DTOs.Response;
using TeamLibrary.API.Shared.Service.Interface;
using static TeamLibrary.API.Features.Admin.DTOs.Response.AdminDashboardResponseDto;

namespace TeamLibrary.API.Shared.Service.Implementation
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<AdminDashboardResponseDto> GetAdminDashboardAsync(GetAdminDashboardRequestDto request)
        {
            var adminName = await GetAdminNameAsync(request.UserId);

            // Get statistics
            var totalBooks = await _context.Books.CountAsync();
            var totalCategories = await _context.Categories.CountAsync();
            var totalViews = await _context.Books.SumAsync(b => b.ViewCount);

            // Get top viewed books
            var topBooks = await _context.Books
                .Include(b => b.Category)
                .OrderByDescending(b => b.ViewCount)
                .Take(5)
                .Select(b => new TopBookDto
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    ViewCount = b.ViewCount,
                    CategoryName = b.Category.Name
                })
                .ToListAsync();

            // Get category statistics
            var categoryStats = await _context.Categories
                .Select(c => new CategoryStatsDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    BookCount = c.Books.Count,
                    TotalViews = c.Books.Sum(b => b.ViewCount)
                })
                .OrderByDescending(c => c.TotalViews)
                .ToListAsync();

            return new AdminDashboardResponseDto
            {
                AdminName = adminName,
                Statistics = new AdminStatisticsDto
                {
                    TotalBooks = totalBooks,
                    TotalCategories = totalCategories,
                    TotalViews = totalViews,
                    TopViewedBooks = topBooks,
                    CategoryStats = categoryStats
                }
            };
        }

        public async Task<bool> IsUserAdminAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user?.UserType == UserType.ADMIN;
        }

        public async Task<string> GetAdminNameAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return "??????";

            return !string.IsNullOrEmpty(user.FullName) ? user.FullName : user.UserName;
        }
    }
}