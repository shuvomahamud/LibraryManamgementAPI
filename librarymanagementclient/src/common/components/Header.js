import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import authService from '../../features/auth/services/authService';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Don't show the menu if the user is not logged in
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Library Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user.role === 'Admin' && <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>}
          {user.role === 'Librarian' && <Nav.Link as={Link} to="/librarian-dashboard">Librarian Dashboard</Nav.Link>}
          {user.role === 'Customer' && <Nav.Link as={Link} to="/user-dashboard">User Dashboard</Nav.Link>}
          <Nav.Link as={Link} to="/books">Books</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown title={<span className="user-icon"><i className="bi bi-person"></i></span>} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
