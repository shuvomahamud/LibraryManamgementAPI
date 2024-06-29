import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookService from "../services/bookService";
import { Container, Form, Button } from "react-bootstrap";
import Header from "../../../common/components/Header";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    coverImagePath: "",
    publisher: "",
    publicationDate: "",
    category: "",
    isbn: "",
    pageCount: 0,
    copies: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.addBook(formData);
      navigate("/books"); // Redirect to book list after successful addition
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2>Add Book</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCoverImagePath">
            <Form.Label>Cover Image Path</Form.Label>
            <Form.Control
              type="text"
              name="coverImagePath"
              value={formData.coverImagePath}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPublisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPublicationDate">
            <Form.Label>Publication Date</Form.Label>
            <Form.Control
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control
              type="number"
              name="pageCount"
              value={formData.pageCount}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCopies">
            <Form.Label>Copies</Form.Label>
            <Form.Control
              type="number"
              name="copies"
              value={formData.copies}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Book
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddBook;
