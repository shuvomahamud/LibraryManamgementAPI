using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryManagementAPI.Application.DTOs;
using LibraryManagementAPI.Domain.Entities;
using LibraryManagementAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Application.Services
{
    public class BookService
    {
        private readonly LibraryContext _context;

        public BookService(LibraryContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task AddBookAsync(BookDto bookDto)
        {
            var book = new Book
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                Description = bookDto.Description,
                Publisher = bookDto.Publisher,
                PublicationDate = bookDto.PublicationDate,
                Category = bookDto.Category,
                ISBN = bookDto.ISBN,
                PageCount = bookDto.PageCount,
                CoverImagePath = bookDto.CoverImagePath,
                Copies = bookDto.Copies,
                IsBorrowed = false
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookAsync(int id, BookDto bookDto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                throw new KeyNotFoundException("Book not found");
            }

            book.Title = bookDto.Title;
            book.Author = bookDto.Author;
            book.Description = bookDto.Description;
            book.Publisher = bookDto.Publisher;
            book.PublicationDate = bookDto.PublicationDate;
            book.Category = bookDto.Category;
            book.ISBN = bookDto.ISBN;
            book.PageCount = bookDto.PageCount;
            book.CoverImagePath = bookDto.CoverImagePath;
            book.Copies = bookDto.Copies;

            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                throw new KeyNotFoundException("Book not found");
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }

        public async Task BorrowBookAsync(int id, string userId)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                throw new KeyNotFoundException("Book not found");
            }

            if (book.Copies <= 0)
            {
                throw new InvalidOperationException("No copies available");
            }

            book.Copies--;
            book.IsBorrowed = true;
            book.BorrowedDate = DateTime.Now;
            book.DueDate = DateTime.Now.AddDays(5);
            book.BorrowerId = userId;

            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task ReturnBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                throw new KeyNotFoundException("Book not found");
            }

            book.Copies++;
            book.IsBorrowed = false;
            book.BorrowedDate = null;
            book.DueDate = null;
            book.BorrowerId = null;

            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Book>> GetBorrowedBooksAsync()
        {
            return await _context.Books.Where(b => b.IsBorrowed).ToListAsync();
        }

    }
}
