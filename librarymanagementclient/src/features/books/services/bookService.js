import axiosInstance from '../../../services/axiosInstance';

const getBooks = async () => {
  const response = await axiosInstance.get('/books');
  return response.data;
};

const getBorrowedBooks = async () => {
  const response = await axiosInstance.get('/borrowed-books');
  return response.data;
};

const bookService = {
  getBooks,
  getBorrowedBooks,
};

export default bookService;
