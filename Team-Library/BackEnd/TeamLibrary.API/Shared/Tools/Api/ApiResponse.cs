using System.Net;

namespace TeamLibrary.API.Shared.Tools.Api
{
    public class ApiResponse
    {
        public string Message { get; set; }
        public string[] Errors { get; set; }
        public int StatusCode { get; set; }
        public object? Data { get; set; }

        public ApiResponse()
        {
            Errors = Array.Empty<string>();
        }

        public ApiResponse(string message, HttpStatusCode status = HttpStatusCode.OK)
        {
            Errors = Array.Empty<string>();

            if (status == HttpStatusCode.OK)
            {
                Message = message;
            }
            else
            {
                Message = null;
                Errors = new[] { message };
            }

            StatusCode = (int)status;
        }

        public ApiResponse(object? data)
        {
            Errors = Array.Empty<string>();
            Data = data;
            StatusCode = (int)HttpStatusCode.OK;
        }

        public ApiResponse(object data, string message)
        {
            Errors = Array.Empty<string>();
            Data = data;
            Message = message;
            StatusCode = (int)HttpStatusCode.OK;
        }

        public ApiResponse(string[] errors)
        {
            Errors = errors ?? Array.Empty<string>();
            StatusCode = (int)HttpStatusCode.BadRequest;
        }

        public ApiResponse(string message, HttpStatusCode status, string[] errors, object data)
        {
            Message = status == HttpStatusCode.OK ? message : null;
            StatusCode = (int)status;
            Errors = errors ?? Array.Empty<string>();
            Data = data;
        }
    }
}
