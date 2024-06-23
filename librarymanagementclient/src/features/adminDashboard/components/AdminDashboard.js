import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import bookService from '../../books/services/bookService';

const AdminDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await bookService.getBorrowedBooks();
        setBorrowedBooks(books.filter(book => !book.isOverdue));
        setOverdueBooks(books.filter(book => book.isOverdue));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleReturn = async (id) => {
    try {
      await bookService.returnBook(id);
      const updatedBorrowedBooks = await bookService.getBorrowedBooks();
      setBorrowedBooks(updatedBorrowedBooks.filter(book => !book.isOverdue));
      setOverdueBooks(updatedBorrowedBooks.filter(book => book.isOverdue));
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <Card className="mb-4">
        <Card.Header>Manage Books</Card.Header>
        <Card.Body>
          <Button variant="primary">Add Book</Button>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header>Borrowed Books</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Borrower</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.borrower}</td>
                  <td>{book.dueDate}</td>
                  <td>
                    <Button variant="success" onClick={() => handleReturn(book.id)}>
                      Mark as Returned
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Overdue Books</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Borrower</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {overdueBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.borrower}</td>
                  <td>{book.dueDate}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleReturn(book.id)}>
                      Mark as Returned
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
