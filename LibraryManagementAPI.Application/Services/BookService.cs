﻿using System.Collections.Generic;
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
            try
            {
                return await _context.Books.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }
            return null;
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
                Copies = bookDto.Copies
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
            bookCopy.DueDate = null;
            bookCopy.BorrowerId = null;

            _context.BookCopies.Update(bookCopy);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<BorrowedBookDto>> GetBorrowedBooksAsync()
        {
            var borrowedBooks = await _context.BookCopies
                .Where(bc => bc.IsBorrowed)
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
    }
}