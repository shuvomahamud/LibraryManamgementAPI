﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementAPI.Domain.Entities
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public DateTime? PublicationDate { get; set; }
        public string Category { get; set; }
        public string ISBN { get; set; }
        public int PageCount { get; set; }
        public string CoverImagePath { get; set; }
        public int Copies { get; set; } // Number of copies

        public ICollection<BookCopy> BookCopies { get; set; }
    }
}
