import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bookService from "../../books/services/bookService";
import Header from "../../../common/components/Header";

const AdminDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role")?.trim();
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated || role !== "Admin") {
      navigate("/");
      return;
    }

    const fetchBooks = async () => {
      try {
        const books = await bookService.getAllBorrowedBooks();
        setBorrowedBooks(books.filter((book) => !book.isOverdue));
        setOverdueBooks(books.filter((book) => book.isOverdue));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [navigate]);

  const handleReturn = async (id) => {
    try {
      await bookService.returnBook(id);
      const updatedBorrowedBooks = await bookService.getAllBorrowedBooks();
      setBorrowedBooks(updatedBorrowedBooks.filter((book) => !book.isOverdue));
      setOverdueBooks(updatedBorrowedBooks.filter((book) => book.isOverdue));
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <>
      <Header />
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
                  <th>Borrower Name</th>
                  <th>Borrower Email</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book.bookCopyId}>
                    <td>{book.title}</td>
                    <td>{book.borrowerName}</td>
                    <td>{book.borrowerEmail}</td>
                    <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleReturn(book.bookCopyId)}
                      >
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
                  <th>Borrower Name</th>
                  <th>Borrower Email</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {overdueBooks.map((book) => (
                  <tr key={book.bookCopyId}>
                    <td>{book.title}</td>
                    <td>{book.borrowerName}</td>
                    <td>{book.borrowerEmail}</td>
                    <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleReturn(book.bookCopyId)}
                      >
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
    </>
  );
};

export default AdminDashboard;
