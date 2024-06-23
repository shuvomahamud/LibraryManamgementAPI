using LibraryManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManagementAPI.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(LibraryContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            if (!context.Roles.Any())
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
                await roleManager.CreateAsync(new IdentityRole("Librarian"));
                await roleManager.CreateAsync(new IdentityRole("Customer"));
            }

            if (!context.Users.Any())
            {
                var adminUser = new ApplicationUser
                {
                    UserName = "admin@library.com",
                    Email = "admin@library.com",
                    FirstName = "Admin",
                    LastName = "User",
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(adminUser, "Admin@123");
                await userManager.AddToRoleAsync(adminUser, "Admin");

                var librarianUser = new ApplicationUser
                {
                    UserName = "librarian@library.com",
                    Email = "librarian@library.com",
                    FirstName = "Librarian",
                    LastName = "User",
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(librarianUser, "Librarian@123");
                await userManager.AddToRoleAsync(librarianUser, "Librarian");
            }

            if (!context.Books.Any())
            {
                context.Books.AddRange(
                    new Book { Title = "Book 1", Author = "Author 1", Description = "Description 1", Copies = 5 },
                    new Book { Title = "Book 2", Author = "Author 2", Description = "Description 2", Copies = 3 }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}
