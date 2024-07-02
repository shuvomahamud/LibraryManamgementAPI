using LibraryManagementAPI.Application.Interfaces;
using LibraryManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManagementAPI.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(UserManager<ApplicationUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<AuthenticationResult> Authenticate(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenService.GenerateToken(user, roles);

            return new AuthenticationResult
            {
                Token = token,
                UserId = user.Id,
                Role = roles.FirstOrDefault() // Assuming a user has a single role
            };
        }
    }
}
