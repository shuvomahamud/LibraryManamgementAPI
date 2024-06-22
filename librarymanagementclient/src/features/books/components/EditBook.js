import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import bookService from '../services/bookService';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await bookService.getBookById(id);
        setBook(fetchedBook);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.updateBook(id, book);
      navigate('/librarian-dashboard');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-5">
      <h2>Edit Book</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={book.title || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={book.author || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={book.description || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPublisher">
          <Form.Label>Publisher</Form.Label>
          <Form.Control
            type="text"
            name="publisher"
            value={book.publisher || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPublicationDate">
          <Form.Label>Publication Date</Form.Label>
          <Form.Control
            type="date"
            name="publicationDate"
            value={book.publicationDate || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={book.category || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formIsbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            value={book.isbn || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPageCount">
          <Form.Label>Page Count</Form.Label>
          <Form.Control
            type="number"
            name="pageCount"
            value={book.pageCount || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCoverImagePath">
          <Form.Label>Cover Image Path</Form.Label>
          <Form.Control
            type="text"
            name="coverImagePath"
            value={book.coverImagePath || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCopies">
          <Form.Label>Copies</Form.Label>
          <Form.Control
            type="number"
            name="copies"
            value={book.copies || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditBook;
