import axiosInstance from '../../../services/axiosInstance';

const getBooks = async () => {
  const response = await axiosInstance.get('/books');
  return response.data;
};

const getBorrowedBooks = async () => {
  const response = await axiosInstance.get('/borrowed-books');
  return response.data;
};

const addBook = async (book) => {
  const response = await axiosInstance.post('/books', book);
  return response.data;
};

const updateBook = async (id, book) => {
  const response = await axiosInstance.put(`/books/${id}`, book);
  return response.data;
};

const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};

const bookService = {
  getBooks,
  getBorrowedBooks,
  addBook,
  updateBook,
  deleteBook,
};

export default bookService;
