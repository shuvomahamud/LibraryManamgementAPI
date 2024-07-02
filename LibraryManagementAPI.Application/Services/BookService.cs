using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryManagementAPI.Application.DTOs;
using LibraryManagementAPI.Application.Interfaces;
using LibraryManagementAPI.Domain.Entities;
using LibraryManagementAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Application.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryContext _context;

        public BookService(LibraryContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            try
            {
                var availableBooks = await _context.Books
                    .Where(book => _context.BookCopies
                        .Where(copy => copy.BookId == book.Id && !copy.IsBorrowed)
                        .Any())
                    .ToListAsync();

                return availableBooks;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
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
                CoverImagePath = bookDto.CoverImagePath,
                Publisher = bookDto.Publisher,
                PublicationDate = bookDto.PublicationDate,
                Category = bookDto.Category,
                ISBN = bookDto.ISBN,
                PageCount = bookDto.PageCount,
                Copies = bookDto.Copies
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // Create entries in BookCopies table
            for (int i = 0; i < bookDto.Copies; i++)
            {
                var bookCopy = new BookCopy
                {
                    BookId = book.Id,
                    IsBorrowed = false,
                    IsOverdue = false,
                    BorrowerId = ""
                };
                _context.BookCopies.Add(bookCopy);
            }
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
            if (book.Copies < bookDto.Copies)
            {
                for (int i = 0; i < (bookDto.Copies - book.Copies); i++)
                {
                    var bookCopy = new BookCopy
                    {
                        BookId = book.Id,
                        IsBorrowed = false,
                        IsOverdue = false,
                        BorrowerId = ""
                    };
                    _context.BookCopies.Add(bookCopy);
                }
                book.Copies = bookDto.Copies;
            }

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

            var bookCopies = _context.BookCopies.Where(bc => bc.BookId == id);
            _context.BookCopies.RemoveRange(bookCopies);
            _context.Books.Remove(book);

            await _context.SaveChangesAsync();
        }
        public async Task BorrowBookAsync(int id, string userId)
        {
            var bookCopy = await _context.BookCopies.FirstOrDefaultAsync(bc => bc.BookId == id && !bc.IsBorrowed);
            if (bookCopy == null)
            {
                throw new KeyNotFoundException("No available copies of the book found.");
            }

            bookCopy.IsBorrowed = true;
            bookCopy.BorrowedDate = DateTime.Now;
            bookCopy.DueDate = DateTime.Now.AddDays(5);
            bookCopy.BorrowerId = userId;

            _context.BookCopies.Update(bookCopy);
            await _context.SaveChangesAsync();
        }

        public async Task ReturnBookAsync(int id)
        {
            var bookCopy = await _context.BookCopies.FirstOrDefaultAsync(bc => bc.Id == id && bc.IsBorrowed);
            if (bookCopy == null)
            {
                throw new KeyNotFoundException("Borrowed book copy not found.");
            }

            bookCopy.IsBorrowed = false;
            bookCopy.BorrowedDate = null;
            bookCopy.IsOverdue = false;
            bookCopy.DueDate = null;
            bookCopy.BorrowerId = "";

            _context.BookCopies.Update(bookCopy);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<BorrowedBookDto>> GetBorrowedBooksByUserAsync(string userId)
        {
            var borrowedBooks = await _context.BookCopies
                .Where(bc => bc.IsBorrowed && bc.BorrowerId == userId)
                .Join(
                    _context.Books,
                    bc => bc.BookId,
                    b => b.Id,
                    (bc, b) => new BorrowedBookDto
                    {
                        BookCopyId = bc.Id,
                        BookId = b.Id,
                        Title = b.Title,
                        Author = b.Author,
                        Description = b.Description,
                        Publisher = b.Publisher,
                        PublicationDate = b.PublicationDate,
                        Category = b.Category,
                        ISBN = b.ISBN,
                        PageCount = b.PageCount,
                        CoverImagePath = b.CoverImagePath,
                        BorrowedDate = bc.BorrowedDate,
                        DueDate = bc.DueDate,
                        BorrowerId = bc.BorrowerId
                    })
                .ToListAsync();

            return borrowedBooks;
        }

        public async Task<IEnumerable<BorrowedBookDto>> GetAllBorrowedBooksAsync()
        {
            var borrowedBooks = await _context.BookCopies
                .Where(bc => bc.IsBorrowed)
                .Join(
                    _context.Books,
                    bc => bc.BookId,
                    b => b.Id,
                    (bc, b) => new { bc, b })
                .Join(
                    _context.Users,
                    combined => combined.bc.BorrowerId,
                    user => user.Id,
                    (combined, user) => new BorrowedBookDto
                    {
                        BookCopyId = combined.bc.Id,
                        BookId = combined.b.Id,
                        Title = combined.b.Title,
                        Author = combined.b.Author,
                        Description = combined.b.Description,
                        Publisher = combined.b.Publisher,
                        PublicationDate = combined.b.PublicationDate,
                        Category = combined.b.Category,
                        ISBN = combined.b.ISBN,
                        PageCount = combined.b.PageCount,
                        CoverImagePath = combined.b.CoverImagePath,
                        BorrowedDate = combined.bc.BorrowedDate,
                        DueDate = combined.bc.DueDate,
                        BorrowerId = combined.bc.BorrowerId,
                        BorrowerName = user.FirstName + " " + user.LastName,
                        BorrowerEmail = String.IsNullOrEmpty(user.Email)? "" : user.Email
                    })
                .ToListAsync();

            return borrowedBooks;
        }
        public async Task<IEnumerable<BorrowedBookDto>> GetOverdueBooksAsync()
        {
            var overdueBooks = await _context.BookCopies
                .Where(bc => bc.DueDate < DateTime.Now && bc.IsBorrowed)
                .Join(
                    _context.Books,
                    bc => bc.BookId,
                    b => b.Id,
                    (bc, b) => new BorrowedBookDto
                    {
                        BookCopyId = bc.Id,
                        BookId = b.Id,
                        Title = b.Title,
                        Author = b.Author,
                        BorrowedDate = bc.BorrowedDate,
                        DueDate = bc.DueDate,
                        BorrowerId = bc.BorrowerId,
                        BorrowerName = _context.Users
                            .Where(u => u.Id == bc.BorrowerId)
                            .Select(u => u.FirstName + " " + u.LastName)
                            .FirstOrDefault(),
                        BorrowerEmail = _context.Users
                            .Where(u => u.Id == bc.BorrowerId)
                            .Select(u => u.Email)
                            .FirstOrDefault()
                    })
                .ToListAsync();

            return overdueBooks;
        }


    }
}
