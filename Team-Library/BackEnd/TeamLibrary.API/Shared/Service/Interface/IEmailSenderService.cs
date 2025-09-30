using TeamLibrary.API.Featrues.Admin.DTOs.Request;
using TeamLibrary.API.Shared.Models.EmailSender;

namespace TeamLibrary.API.Shared.Service.Interface;

public interface IEmailSenderService
{
    Task<bool> SendMessage(SendMessageEmailRequest request);

}
