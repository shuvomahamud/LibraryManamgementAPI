import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <Card className="mb-4">
        <Card.Header>Manage Books</Card.Header>
        <Card.Body>
          <Button variant="primary">Add Book</Button>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header>Borrowed Books</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Borrower</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows dynamically from API */}
              <tr>
                <td>Book Title</td>
                <td>John Doe</td>
                <td>2024-06-30</td>
                <td>
                  <Button variant="success">Mark as Returned</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Overdue Books</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Borrower</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows dynamically from API */}
              <tr>
                <td>Book Title</td>
                <td>Jane Smith</td>
                <td>2024-06-15</td>
                <td>
                  <Button variant="danger">Mark as Returned</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
