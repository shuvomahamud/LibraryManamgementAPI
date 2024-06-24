import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import bookService from '../../books/services/bookService';
import Header from '../../../common/components/Header'; // Import Header component

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await bookService.getBooks();
        setBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchBorrowedBooks = async () => {
      try {
        const books = await bookService.getBorrowedBooks();
        setBorrowedBooks(books);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  const handleBorrow = async (id) => {
    try {
      await bookService.borrowBook(id);
      const updatedBorrowedBooks = await bookService.getBorrowedBooks();
      setBorrowedBooks(updatedBorrowedBooks);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  return (
    <>
      <Header /> {/* Include Header component */}
      <Container className="mt-5">
        <h2>User Dashboard</h2>
        <h3>Available Books</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Button variant="primary" onClick={() => handleBorrow(book.id)}>
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Borrowed Books</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrowed Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.borrowedDate}</td>
                <td>{book.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserDashboard;
