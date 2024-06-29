using LibraryManagementAPI.Application.DTOs;
using LibraryManagementAPI.Application.Services;
using LibraryManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LibraryManagementAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] BookDto bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Invalid book data.");
            }

            await _bookService.AddBookAsync(bookDto);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, BookDto bookDto)
        {
            if (id != bookDto.Id)
            {
                return BadRequest();
            }

            await _bookService.UpdateBookAsync(id, bookDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                await _bookService.DeleteBookAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }


        [HttpPost("{id}/borrow")]
        public async Task<IActionResult> BorrowBook(int id, [FromBody] BorrowBookRequest request)
        {
            var userId = request.UserId ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _bookService.BorrowBookAsync(id, userId);
              return Ok();
        }

        [HttpPost("{id}/return")]
        public async Task<IActionResult> ReturnBook(int id)
        {
            await _bookService.ReturnBookAsync(id);
            return NoContent();
        }

        [HttpGet("borrowed")]
        public async Task<IActionResult> GetAllBorrowedBooks()
        {
            var borrowedBooks = await _bookService.GetAllBorrowedBooksAsync();
            return Ok(borrowedBooks);
        }

        [HttpGet("borrowed/user/{userId}")]
        public async Task<IActionResult> GetBorrowedBooksByUser(string userId)
        {
            var borrowedBooks = await _bookService.GetBorrowedBooksByUserAsync(userId);
            return Ok(borrowedBooks);
        }

        [HttpGet("overdue")]
        public async Task<ActionResult<IEnumerable<BorrowedBookDto>>> GetOverdueBooks()
        {
            var overdueBooks = await _bookService.GetOverdueBooksAsync();
            return Ok(overdueBooks);
        }

    }
}
