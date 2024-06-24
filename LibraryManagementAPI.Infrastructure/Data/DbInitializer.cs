using LibraryManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Identity;
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

            // Check if the database is already seeded
            if (context.Books.Any())
            {
                logger.LogInformation("Database already seeded with books.");
                return;
            }

            // Seed roles
            var roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin" },
                new IdentityRole { Name = "Librarian" },
                new IdentityRole { Name = "Customer" }
            };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role.Name))
                {
                    await roleManager.CreateAsync(role);
                }
            }

            // Seed users
            var adminUser = new ApplicationUser { UserName = "admin@library.com", Email = "admin@library.com", FirstName = "Admin", LastName = "User", EmailConfirmed = true };
            var librarianUser = new ApplicationUser { UserName = "librarian@library.com", Email = "librarian@library.com", FirstName = "Librarian", LastName = "User", EmailConfirmed = true };
            var customerUser = new ApplicationUser { UserName = "customer@library.com", Email = "customer@library.com", FirstName = "Customer", LastName = "User", EmailConfirmed = true };

            if (await userManager.FindByEmailAsync(adminUser.Email) == null)
            {
                await userManager.CreateAsync(adminUser, "Admin@123");
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }

            if (await userManager.FindByEmailAsync(librarianUser.Email) == null)
            {
                await userManager.CreateAsync(librarianUser, "Librarian@123");
                await userManager.AddToRoleAsync(librarianUser, "Librarian");
            }

            if (await userManager.FindByEmailAsync(customerUser.Email) == null)
            {
                await userManager.CreateAsync(customerUser, "Customer@123");
                await userManager.AddToRoleAsync(customerUser, "Customer");
            }

            // Seed books
            var books = new List<Book>
            {
                new Book { Title = "Book 1", Author = "Author 1", Description = "Description 1", Publisher = "Publisher 1", PublicationDate = DateTime.Now, Category = "Category 1", ISBN = "1234567890", PageCount = 100, CoverImagePath = "path/to/image1.jpg", Copies = 5 },
                new Book { Title = "Book 2", Author = "Author 2", Description = "Description 2", Publisher = "Publisher 2", PublicationDate = DateTime.Now, Category = "Category 2", ISBN = "0987654321", PageCount = 200, CoverImagePath = "path/to/image2.jpg", Copies = 3 },
                new Book { Title = "Book 3", Author = "Author 3", Description = "Description 3", Publisher = "Publisher 3", PublicationDate = DateTime.Now, Category = "Category 3", ISBN = "1122334455", PageCount = 300, CoverImagePath = "path/to/image3.jpg", Copies = 2 }
            };

            context.Books.AddRange(books);
            await context.SaveChangesAsync();

            // Seed book copies
            foreach (var book in books)
            {
                var bookCopies = new List<BookCopy>();
                for (int i = 0; i < book.Copies; i++)
                {
                    bookCopies.Add(new BookCopy
                    {
                        BookId = book.Id,
                        IsBorrowed = false
                    });
                }
                context.BookCopies.AddRange(bookCopies);
            }

            await context.SaveChangesAsync();
        }
    }
}
