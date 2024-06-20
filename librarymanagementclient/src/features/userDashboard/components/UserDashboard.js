import React from 'react';
import { Container } from 'react-bootstrap';

const UserDashboard = () => {
  return (
    <Container className="mt-5">
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard. Here you can see the books you have borrowed and their due dates.</p>
      {/* Add more content here */}
    </Container>
  );
};

export default UserDashboard;
