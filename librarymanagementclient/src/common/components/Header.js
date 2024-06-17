import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/user-dashboard">User Dashboard</Link></li>
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
