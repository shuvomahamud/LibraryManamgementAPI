using LibraryManagementAPI.Domain.Entities;

namespace LibraryManagementAPI.Application.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(ApplicationUser user, IList<string> roles);
    }
}
