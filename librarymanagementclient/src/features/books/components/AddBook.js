import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import bookService from '../services/bookService';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [category, setCategory] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [coverImagePath, setCoverImagePath] = useState('');
  const [copies, setCopies] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      description,
      publisher,
      publicationDate,
      category,
      isbn,
      pageCount,
      coverImagePath,
      copies,
    };

    try {
      await bookService.addBook(newBook);
      navigate('/librarian-dashboard');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add Book</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPublisher">
          <Form.Label>Publisher</Form.Label>
          <Form.Control
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPublicationDate">
          <Form.Label>Publication Date</Form.Label>
          <Form.Control
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formIsbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPageCount">
          <Form.Label>Page Count</Form.Label>
          <Form.Control
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCoverImagePath">
          <Form.Label>Cover Image Path</Form.Label>
          <Form.Control
            type="text"
            value={coverImagePath}
            onChange={(e) => setCoverImagePath(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCopies">
          <Form.Label>Copies</Form.Label>
          <Form.Control
            type="number"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </Container>
  );
};

export default AddBook;
