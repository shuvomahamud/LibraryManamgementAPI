import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import BookList from './features/books/components/BookList';
import BookDetail from './features/books/components/BookDetail';
import AddBook from './features/books/components/AddBook';
import EditBook from './features/books/components/EditBook';
import UserDashboard from './features/userDashboard/components/UserDashboard';
import AdminDashboard from './features/adminDashboard/components/AdminDashboard';
import LibrarianDashboard from './features/librarianDashboard/components/LibrarianDashboard';
import OverdueBooksTable from './features/adminDashboard/components/OverdueBooksTable';
import Profile from './features/profile/components/Profile';
import Footer from './common/components/Footer';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      {console.log(isAuthenticated)}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route
          path="/user-dashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated && role === 'Admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/librarian-dashboard"
          element={
            isAuthenticated && role === 'Librarian' ? (
              <LibrarianDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/overdue-books" element={<OverdueBooksTable />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? (role === 'Admin' ? '/admin-dashboard' : role === 'Librarian' ? '/librarian-dashboard' : '/user-dashboard') : '/login'} />} />
      </Routes>
      {isAuthenticated && <Footer />}
    </Router>
  );
}

export default App;
