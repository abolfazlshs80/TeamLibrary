using Microsoft.Extensions.Caching.Memory;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Shared.Service.Implementation;

public class RateLimitService : IRateLimitService
{
    private readonly IMemoryCache _cache;
    private readonly ILogger<RateLimitService> _logger;
    private const int MaxAttempts = 5;
    private const int BlockDurationMinutes = 15;

    public RateLimitService(IMemoryCache cache, ILogger<RateLimitService> logger)
    {
        _cache = cache;
        _logger = logger;
    }

    public async Task<bool> IsAllowedAsync(string identifier)
    {
        var key = $"login_attempts_{identifier}";
        var blockKey = $"login_blocked_{identifier}";

        if (_cache.TryGetValue(blockKey, out DateTime blockedUntil))
        {
            if (DateTime.UtcNow < blockedUntil)
            {
                _logger.LogWarning("Login attempt blocked for {Identifier} until {BlockedUntil}", identifier, blockedUntil);
                return false;
            }
            else
            {
                _cache.Remove(blockKey);
                _cache.Remove(key);
            }
        }

        return true;
    }

    public async Task RecordFailedAttemptAsync(string identifier)
    {
        var key = $"login_attempts_{identifier}";
        var blockKey = $"login_blocked_{identifier}";

        var attempts = _cache.GetOrCreate(key, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(BlockDurationMinutes);
            return 0;
        });

        attempts++;
        _cache.Set(key, attempts, TimeSpan.FromMinutes(BlockDurationMinutes));

        _logger.LogWarning("Failed login attempt {Attempts}/{MaxAttempts} for {Identifier}", attempts, MaxAttempts, identifier);

        if (attempts >= MaxAttempts)
        {
            var blockUntil = DateTime.UtcNow.AddMinutes(BlockDurationMinutes);
            _cache.Set(blockKey, blockUntil, TimeSpan.FromMinutes(BlockDurationMinutes));

            _logger.LogWarning("User {Identifier} blocked until {BlockedUntil} due to {MaxAttempts} failed attempts",
                identifier, blockUntil, MaxAttempts);
        }
    }

    public async Task ResetAttemptsAsync(string identifier)
    {
        var key = $"login_attempts_{identifier}";
        var blockKey = $"login_blocked_{identifier}";

        _cache.Remove(key);
        _cache.Remove(blockKey);

        _logger.LogInformation("Login attempts reset for {Identifier}", identifier);
    }

    public async Task<(bool IsBlocked, TimeSpan RemainingTime)> GetBlockStatusAsync(string identifier)
    {
        var blockKey = $"login_blocked_{identifier}";

        if (_cache.TryGetValue(blockKey, out DateTime blockedUntil))
        {
            var remainingTime = blockedUntil - DateTime.UtcNow;
            if (remainingTime > TimeSpan.Zero)
            {
                return (true, remainingTime);
            }
        }

        return (false, TimeSpan.Zero);
    }
}