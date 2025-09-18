namespace TeamLibrary.API.Shared.Service.Interface;

public interface IRateLimitService
{
    Task<bool> IsAllowedAsync(string identifier);
    Task RecordFailedAttemptAsync(string identifier);
    Task ResetAttemptsAsync(string identifier);
    Task<(bool IsBlocked, TimeSpan RemainingTime)> GetBlockStatusAsync(string identifier);
}