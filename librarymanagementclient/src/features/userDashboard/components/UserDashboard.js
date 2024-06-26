import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bookService from '../../books/services/bookService';
import Header from '../../../common/components/Header';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role')?.trim();
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated || role !== 'Customer') {
      navigate('/');
      return;
    }

    const fetchBooks = async () => {
      try {
        const books = await bookService.getBooks();
        setBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchBorrowedBooks = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const books = await bookService.getBorrowedBooksByUser(userId);
        setBorrowedBooks(books);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBooks();
    fetchBorrowedBooks();
  }, [navigate]);

  const handleBorrow = async (id) => {
    try {
      await bookService.borrowBook(id);
      const updatedBorrowedBooks = await bookService.getBorrowedBooksByUser(localStorage.getItem('userId'));
      setBorrowedBooks(updatedBorrowedBooks);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  return (
    <>
      <Header />
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
              <tr key={book.bookCopyId}>
                <td>{book.title}</td>
                <td>{new Date(book.borrowedDate).toLocaleDateString()}</td>
                <td>{new Date(book.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserDashboard;
