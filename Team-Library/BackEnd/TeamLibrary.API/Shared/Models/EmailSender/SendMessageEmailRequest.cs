namespace TeamLibrary.API.Shared.Models.EmailSender;

public class SendMessageEmailRequest
{
    public required string Email { get; set; }
    public required string Subject { get; set; }
    public required string Text { get; set; }
}
