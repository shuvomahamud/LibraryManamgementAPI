import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { Container, Form, Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting login with:', { email, password });
      const response = await authService.login({ email, password });
      console.log('Login response:', response);
      if (response.token && response.role) {
        localStorage.setItem('token', response.token); // Store the token in localStorage
        // Redirect based on user role
        if (response.role === 'Admin') {
          navigate('/admin-dashboard');
        } else if (response.role === 'Librarian') {
          navigate('/librarian-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
