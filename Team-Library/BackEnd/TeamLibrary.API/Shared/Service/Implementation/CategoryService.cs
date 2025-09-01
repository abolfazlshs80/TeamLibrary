using Azure.Core;
using DrMeet.Api.Shared.Persistence.UnitOfWork;
using ErrorOr;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Data.Repository.Interface;
using TeamLibrary.API.Featrues.Category.DTOs;
using TeamLibrary.API.Shared.PagedList;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.PagedList;
using TeamLibrary.API.Featrues.Category.DTOs.Request;

namespace TeamLibrary.API.Shared.Service.Implementation
{
    public class CategoryService(IUnitOfWork _unitOfWork) : ICategoryService
    {


        public async Task<ErrorOr<string>> AddCategoryAsync(CreateCategoryRequestDto category)
        {
            try
            {
                var slugexists = await _unitOfWork.Categories.AsQueryable().AnyAsync(b => b.Slug == category.Slug);

                if (slugexists)
                {
                    return Error.Validation("Slug", "این اسلاگ قبلاً استفاده شده است.");
                }

                await _unitOfWork.Categories.AddAsync(new Category
                {
                    Name = category.Name?.Trim() ?? string.Empty,
                    Slug = category.Slug?.Trim() ?? string.Empty,
                    Description = category.Description
                });

                return "دسته بندی ثبت شد";
            }
            catch (DbUpdateException ex)
            {

                return Error.Failure(code: "DbError", description: ex.Message);

            }
            catch (Exception ex)
            {
                return Error.Unexpected(description: ex.Message);
            }
        }



        public async Task<ErrorOr<string>> DeleteCategoryByIdAsync(int categoryId)
        {
            var category = await _unitOfWork.Categories.GetByIdAsync(categoryId);

            if (category == null)
            {
                return Error.NotFound(description: "دسته‌بندی پیدا نشد");
            }

            await _unitOfWork.Categories.DeleteAsync(category.Id);
            return "دسته بندی حذف شد";
        }

        public async Task<PagedList<GetCategoryListResponseDto>> GetAllCategoryAsync(GetCategoryListRequestDto request)
        {
            var categories = _unitOfWork.Categories.AsQueryable();

            var result =await  categories.ToPagedList(s => new GetCategoryListResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Slug = s.Slug
            }, request.PageNumber, request.PageSize);

            return result;
     
        }

        public async Task<GetCategoryByIdResponseDto> GetCategoryByIdAsync(int id)
        {
            var categores = await _unitOfWork.Categories.GetByIdAsync(id);

            if (categores == null)
                return null;

            return new GetCategoryByIdResponseDto
            {
                Id = categores.Id,
                Name = categores.Name,
                Slug = categores.Slug,
                Description = categores.Description
            };

        }

        public async Task<ErrorOr<string>> UpdateCategoryAsync(UpdateCategoryRequestDto dto)
        {

            var category = await _unitOfWork.Categories.GetByIdAsync(dto.Id);
            if (category == null)
            {
                return Error.NotFound(description: "دسته‌بندی پیدا نشد");
            }

            category.Name = dto.Name;
            category.Slug = dto.Slug;
            category.Description = dto.Description;

            await _unitOfWork.Categories.UpdateAsync(category);
            return "دسته بندی بروزرسانی شد";
        }


    }
}
