import React from 'react';
import { Container } from 'react-bootstrap';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container className="mt-5">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </Container>
  );
}

export default Profile;
