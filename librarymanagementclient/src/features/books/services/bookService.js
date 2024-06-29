import axiosInstance from '../../../services/axiosInstance';

const getBooks = async () => {
  try {
    const response = await axiosInstance.get('/books');
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
    await axiosInstance.delete(`/books/${id}`);
  } catch (error) {
    console.error('Error deleting book:', error);
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

const getAllBorrowedBooks = async () => {
  try {
    const response = await axiosInstance.get('/books/borrowed');
    console.log('getAllBorrowedBooks response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching all borrowed books:', error);
    throw error;
  }
};

const getBorrowedBooksByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/books/borrowed/user/${userId}`);
    console.log('getBorrowedBooksByUser response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books by user:', error);
    throw error;
  }
};

const getOverdueBooks = async () => {
  try {
    const response = await axiosInstance.get('/books/overdue');
    return response.data;
  } catch (error) {
    console.error('Error fetching overdue books:', error);
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
  getAllBorrowedBooks,
  getBorrowedBooksByUser,
  getOverdueBooks
};

export default bookService;
