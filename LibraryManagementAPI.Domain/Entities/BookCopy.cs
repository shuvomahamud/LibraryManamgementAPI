using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementAPI.Domain.Entities
{
    public class BookCopy
    {
        [Key]
        public int Id { get; set; }
        public int BookId { get; set; }
        public bool IsBorrowed { get; set; }
        public bool IsOverdue { get; set; }
        public DateTime? BorrowedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public string BorrowerId { get; set; }

        public Book Book { get; set; }
    }
}
