using LibraryManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManagementAPI.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(LibraryContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger logger)
        {
            context.Database.EnsureCreated();

            // Seed roles
            if (!context.Roles.Any())
            {
                var roles = new List<IdentityRole>
                {
                    new IdentityRole("Admin"),
                    new IdentityRole("Librarian"),
                    new IdentityRole("Customer")
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                logger.LogInformation("Seeded roles.");
            }

            // Seed users
            if (!context.Users.Any())
            {
                var adminUser = new ApplicationUser
                {
                    UserName = "admin@library.com",
                    Email = "admin@library.com",
                    FirstName = "Admin",
                    LastName = "User",
                    Address = "Admin Address",
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
                    Address = "Librarian Address",
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(librarianUser, "Librarian@123");
                await userManager.AddToRoleAsync(librarianUser, "Librarian");

                var customerUser = new ApplicationUser
                {
                    UserName = "customer@library.com",
                    Email = "customer@library.com",
                    FirstName = "Customer",
                    LastName = "User",
                    Address = "Customer Address",
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(customerUser, "Customer@123");
                await userManager.AddToRoleAsync(customerUser, "Customer");

                logger.LogInformation("Seeded users.");
            }

            // Seed books
            if (!context.Books.Any())
            {
                var books = new List<Book>
                {
                    new Book { Title = "Book 1", Author = "Author 1", Description = "Description 1", ISBN = "1111111111", Category = "Fiction", PageCount = 100, Publisher = "Publisher 1", PublicationDate = DateTime.Now.AddYears(-1), Copies = 5, CoverImagePath = "path/to/image1.jpg" },
                    new Book { Title = "Book 2", Author = "Author 2", Description = "Description 2", ISBN = "2222222222", Category = "Non-Fiction", PageCount = 200, Publisher = "Publisher 2", PublicationDate = DateTime.Now.AddYears(-2), Copies = 3, CoverImagePath = "path/to/image2.jpg" },
                    new Book { Title = "Book 3", Author = "Author 3", Description = "Description 3", ISBN = "3333333333", Category = "Science", PageCount = 300, Publisher = "Publisher 3", PublicationDate = DateTime.Now.AddYears(-3), Copies = 2, CoverImagePath = "path/to/image3.jpg" },
                };

                context.Books.AddRange(books);
                await context.SaveChangesAsync();

                logger.LogInformation("Seeded books.");
            }
        }
    }
}
