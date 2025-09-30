using FluentEmail.Core;
using TeamLibrary.API.Featrues.Admin.DTOs.Request;
using TeamLibrary.API.Shared.Models.EmailSender;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Shared.Service.Implementation;

public class GmailSenderService : IEmailSenderService
{
    private readonly IFluentEmail _email;

    public GmailSenderService(IFluentEmail email)
    {
        _email = email;
    }

   
    public async Task<bool> SendMessage(SendMessageEmailRequest request)
    {
        try
        {
            await _email
        .To(request.Email)
        .Subject(request.Subject)
        .Body(request.Text)
        .SendAsync();
            return true;
        }
        catch (Exception)
        {

            return false;
        }
    }
}