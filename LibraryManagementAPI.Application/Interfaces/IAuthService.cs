using System.Threading.Tasks;

namespace LibraryManagementAPI.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthenticationResult> Authenticate(string email, string password);
    }

    public class AuthenticationResult
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
    }
}
