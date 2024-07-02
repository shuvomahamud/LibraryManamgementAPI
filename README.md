# Library Management System

This project is a full-stack Library Management System with a .NET 8.0 backend and a React frontend. The backend is implemented using ASP.NET Core and Entity Framework Core, while the frontend is built using React with Bootstrap for styling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- .NET 8.0 SDK
- Node.js (v14 or later)
- npm (v6 or later)
- SQL Server

## Current Limitations
1. When editing books, the number of new book copies cannot be smaller than the previous count. This is to prevent issues where more books are borrowed than the updated copy count allows.
2. Lost books need to be handled.
3. Book cover images are not saved to the server storage.
4. Data tables need to be introduced.
5. Book search functionality should be added.
6. Authorization in the API is missing.
7. Form validation is missing.

## Getting Started

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>/LibraryManagementAPI
    ```

2. **Database Setup:**

    Update the connection string in `appsettings.json` file located in the `LibraryManagementAPI.API` project.

3. **Run Migrations:**

    Open a terminal in the `LibraryManagementAPI.API` project directory and run the following commands to apply the migrations and seed the database:

    ```bash
    dotnet ef database update
    ```

4. **Run the Backend:**

    In the same directory, run the backend application:

    ```bash
    dotnet run
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd <repository-directory>/librarymanagementclient
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the Frontend:**

    ```bash
    npm start
    ```

### Running the Application

Once both the backend and frontend are running, you can access the application by navigating to `http://localhost:3000` in your web browser.

## Project Structure

### Backend (LibraryManagementAPI)

- **API Project:** Contains the controllers and startup configuration.
- **Application Project:** Contains the business logic and service classes.
- **Domain Project:** Contains the domain entities.
- **Infrastructure Project:** Contains the data access logic using Entity Framework Core.

#### Important Files

- `Program.cs`: Configures the application and middleware.
- `appsettings.json`: Contains configuration settings like the database connection string.
- `LibraryManagementAPI.API.csproj`: Project file containing the package references.

### Frontend (LibraryManagementClient)

- **Components:** Contains the React components for the different pages and functionalities.
- **Services:** Contains the service files for making API calls.

#### Important Files

- `src/App.js`: Main entry point of the React application.
- `src/index.js`: Renders the React application.
- `package.json`: Contains the project dependencies and scripts.

## Authentication and Authorization

- **JWT Authentication:** The application uses JWT for authentication.
- **Role-based Authorization:** The application supports role-based authorization for Admin, Librarian, and Customer roles.

### Admin Functionalities

- Manage users
- View all borrowed and overdue books
- Add, edit, and delete books

### Librarian Functionalities

- View all borrowed and overdue books
- Mark books as returned
- Add, edit, and delete books

### Customer Functionalities

- View available books
- Borrow books
- View borrowed books

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate a user.

### Books

- `GET /api/books`: Get all available books.
- `GET /api/books/{id}`: Get details of a book by ID.
- `POST /api/books`: Add a new book (Admin and Librarian only).
- `PUT /api/books/{id}`: Update a book (Admin and Librarian only).
- `DELETE /api/books/{id}`: Delete a book (Admin and Librarian only).
- `POST /api/books/{id}/borrow`: Borrow a book.
- `POST /api/books/{id}/return`: Return a borrowed book.
- `GET /api/Books/borrowed` : Get all borrowed books.
- `GET /api/Books/borrowed/user/{userId}` : Get user specific borrowed books.
- `GET /api/Books/overdue` : Get all overdue books.


### Users

- `GET /api/user/profile`: Get user profile.
- `PUT /api/user/profile`: Update user profile.
- `GET /api/user`: Get all users (Admin only).
- `DELETE /api/user/{id}`: Delete a user (Admin only).

## License

This project is licensed under the MIT License.

---
