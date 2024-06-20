import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import bookService from '../../books/services/bookService';

const UserDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const books = await bookService.getBorrowedBooks();
        setBorrowedBooks(books);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <Container className="mt-5">
      <h2>User Dashboard</h2>
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
  );
};

export default UserDashboard;
