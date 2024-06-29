import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import Profile from './features/profile/components/profile'; 
import Footer from './common/components/Footer';

var isAuthenticated;
var role;

function App() {
  isAuthenticated = !!localStorage.getItem('token');
  role = localStorage.getItem('role')?.trim() || '';
  const DefaultRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
      isAuthenticated = !!localStorage.getItem('token');
      role = String(localStorage.getItem('role')?.trim() || '');
      console.log(isAuthenticated + role)
      if (isAuthenticated) {
        switch (role) {
          case 'Admin':
            navigate('/admin-dashboard', { replace: true });
            break;
          case 'Librarian':
            navigate('/librarian-dashboard', { replace: true });
            break;
          case 'Customer':
            navigate('/user-dashboard', { replace: true });
            console.log("User issue")
            break;
          default:
            navigate('/login', { replace: true });
            console.log("Role issue")
        }
      } else {
        console.log("Authentication issue")
        navigate('/login', { replace: true });
      }
    }, [navigate]);

    return null;
  };

  return (
    <Router>
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
            <UserDashboard />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
          <AdminDashboard />
        }
        />
        <Route
          path="/librarian-dashboard"
          element={
            <LibrarianDashboard />
          }
        />
        <Route path="/overdue-books" element={<OverdueBooksTable />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<DefaultRedirect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
