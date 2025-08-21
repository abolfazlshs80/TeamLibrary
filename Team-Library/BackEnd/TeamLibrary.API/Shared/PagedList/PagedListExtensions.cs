using System.Linq.Expressions;
using Mapster;
using Microsoft.EntityFrameworkCore;


namespace TeamLibrary.API.Shared.PagedList;

public static class PagedListExtensions
{
    public static async Task<PagedList<TDest>> ToPagedList<TDest>
        (this IQueryable<TDest> source, int? page = 1, int? pageSize = 50)
    {
        page ??= 1;
        pageSize ??= 50;

        int count = await source.CountAsync();

        var paginationMetadata = new PagedListInfo
        {
            PageNumber = page.Value,
            TotalCount = count,
            PageSize = pageSize
        };

        int totalPages = (int)Math.Ceiling(count / (double)paginationMetadata!.PageSize);

        paginationMetadata.TotalPages = totalPages;

        var data = await source
            .Skip((page.Value - 1) * paginationMetadata.PageSize.Value)
            .Take(paginationMetadata.PageSize.Value).ToListAsync();

        return new PagedList<TDest>
        {
            List = data,
            Pagination = paginationMetadata
        };
    }
    
    
    public static async Task<PagedList<TDest>> ToPagedList<TSource, TDest>
    (this IQueryable<TSource> source, Expression<Func<TSource, TDest>> selector,
        int? page = 1, int? pageSize = 50)
    {
        page ??= 1;
        pageSize ??= 50;

        var count = await source.CountAsync();

        var paginationMetadata = new PagedListInfo
        {
            PageNumber = page.Value,
            TotalCount = count,
            PageSize = pageSize
        };

        var totalPages = (int)Math.Ceiling(count / (double)paginationMetadata!.PageSize);

        paginationMetadata.TotalPages = totalPages;

        var data = await source
            .Select(selector)
            .Skip((page.Value - 1) * paginationMetadata.PageSize.Value)
            .Take(paginationMetadata.PageSize.Value).ToListAsync();

        return new PagedList<TDest>
        {
            List = data.Adapt<List<TDest>>(),
            Pagination = paginationMetadata
        };
    }

    
    public static async Task<PagedList<TDest>> ToPagedList<TSource, TDest>
    (this IQueryable<TSource> source,
        int? page = 1, int? pageSize = 50)
    {
        page ??= 1;
        pageSize ??= 50;

        var count = await source.CountAsync();

        var paginationMetadata = new PagedListInfo
        {
            PageNumber = page.Value,
            TotalCount = count,
            PageSize = pageSize
        };

        var totalPages = (int)Math.Ceiling(count / (double)paginationMetadata!.PageSize);

        paginationMetadata.TotalPages = totalPages;

        var data = await source
            .Skip((page.Value - 1) * paginationMetadata.PageSize.Value)
            .Take(paginationMetadata.PageSize.Value).ToListAsync();

        return new PagedList<TDest>
        {
            List = data.Adapt<List<TDest>>(),
            Pagination = paginationMetadata
        };
    }
    
    
}