using System.Threading.Tasks;
using LibraryManagementAPI.Application.DTOs;
using LibraryManagementAPI.Application.Services;
using LibraryManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;
        private readonly UserManager<ApplicationUser> _userManager;

        public BooksController(BookService bookService, UserManager<ApplicationUser> userManager)
        {
            _bookService = bookService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Librarian")]
        public async Task<IActionResult> AddBook([FromBody] BookDto bookDto)
        {
            await _bookService.AddBookAsync(bookDto);
            return CreatedAtAction(nameof(GetBook), new { id = bookDto.Title }, bookDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Librarian")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto)
        {
            await _bookService.UpdateBookAsync(id, bookDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Librarian")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            await _bookService.DeleteBookAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/borrow")]
        public async Task<IActionResult> BorrowBook(int id)
        {
            var userId = _userManager.GetUserId(User);
            await _bookService.BorrowBookAsync(id, userId);
            return NoContent();
        }

        [HttpPost("{id}/return")]
        [Authorize(Roles = "Admin,Librarian")]
        public async Task<IActionResult> ReturnBook(int id)
        {
            await _bookService.ReturnBookAsync(id);
            return NoContent();
        }

        [HttpGet("borrowed-books")]
        public async Task<IActionResult> GetBorrowedBooks()
        {
            var borrowedBooks = await _bookService.GetBorrowedBooksAsync();
            return Ok(borrowedBooks);
        }

    }
}
