import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import bookService from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import Header from '../../../common/components/Header';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await bookService.getBooks();
        setBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await bookService.deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleAddBook = () => {
    navigate('/add-book');
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2>Books</h2>
        <Button variant="primary" onClick={handleAddBook}>
          Add Book
        </Button>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Cover Image</th>
              <th>Publisher</th>
              <th>Publication Date</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Page Count</th>
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <img src={book.coverImagePath} alt={book.title} width="50" />
                </td>
                <td>{book.publisher}</td>
                <td>{new Date(book.publicationDate).toLocaleDateString()}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td>{book.pageCount}</td>
                <td>{book.copies}</td>
                <td>
                  <Button variant="warning" onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default BookList;
