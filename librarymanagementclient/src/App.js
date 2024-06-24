import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import BookList from "./features/books/components/BookList";
import BookDetail from "./features/books/components/BookDetail";
import AddBook from "./features/books/components/AddBook";
import EditBook from "./features/books/components/EditBook";
import UserDashboard from "./features/userDashboard/components/UserDashboard";
import AdminDashboard from "./features/adminDashboard/components/AdminDashboard";
import LibrarianDashboard from "./features/librarianDashboard/components/LibrarianDashboard";
import OverdueBooksTable from "./features/adminDashboard/components/OverdueBooksTable";
import Profile from "./features/profile/components/Profile";
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

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
        <Route
          path="/user-dashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/librarian-dashboard"
          element={
            isAuthenticated ? <LibrarianDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/overdue-books"
          element={
            isAuthenticated ? <OverdueBooksTable /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
