import axiosInstance from '../../../services/axiosInstance';

const getBooks = async () => {
  try {
    const response = await axiosInstance.get('/books');
    console.log('getBooks response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    console.log('getBookById response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

const addBook = async (book) => {
  try {
    const response = await axiosInstance.post('/books', book);
    console.log('addBook response:', response);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

const updateBook = async (id, book) => {
  try {
    const response = await axiosInstance.put(`/books/${id}`, book);
    console.log('updateBook response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

const deleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    console.log('deleteBook response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};

const borrowBook = async (id) => {
  try {
    const userId = localStorage.getItem('userId'); // Assuming user info is stored in local storage
    const response = await axiosInstance.post(`/books/${id}/borrow`, { userId: userId });
    console.log('borrowBook response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error borrowing book with id ${id}:`, error);
    throw error;
  }
};

const returnBook = async (id) => {
  try {
    const response = await axiosInstance.post(`/books/${id}/return`);
    console.log('returnBook response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error returning book with id ${id}:`, error);
    throw error;
  }
};

const getBorrowedBooks = async () => {
  try {
    const response = await axiosInstance.get('/books/borrowed');
    console.log('getBorrowedBooks response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

const bookService = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBorrowedBooks,
};

export default bookService;
