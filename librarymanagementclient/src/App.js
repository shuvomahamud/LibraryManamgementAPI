import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import BookList from './features/books/components/BookList';
import BookDetail from './features/books/components/BookDetail';
import AddBook from './features/books/components/AddBook';
import EditBook from './features/books/components/EditBook';
import UserDashboard from './features/userDashboard/components/UserDashboard';
import AdminDashboard from './features/adminDashboard/components/AdminDashboard';
import OverdueBooksTable from './features/adminDashboard/components/OverdueBooksTable';
import Header from './common/components/Header';
import Footer from './common/components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/overdue-books" element={<OverdueBooksTable />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
