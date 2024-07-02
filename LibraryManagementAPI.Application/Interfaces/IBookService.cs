using LibraryManagementAPI.Application.DTOs;
using LibraryManagementAPI.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryManagementAPI.Application.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<Book> GetBookByIdAsync(int id);
        Task AddBookAsync(BookDto bookDto);
        Task UpdateBookAsync(int id, BookDto bookDto);
        Task DeleteBookAsync(int id);
        Task BorrowBookAsync(int id, string userId);
        Task ReturnBookAsync(int id);
        Task<IEnumerable<BorrowedBookDto>> GetBorrowedBooksByUserAsync(string userId);
        Task<IEnumerable<BorrowedBookDto>> GetAllBorrowedBooksAsync();
        Task<IEnumerable<BorrowedBookDto>> GetOverdueBooksAsync();
    }
}
