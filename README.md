# Uber Clone Backend

A backend API for an Uber-like ride-sharing application built with Node.js and Express.

## Features

- User authentication and management
- Driver matching algorithm
- Real-time location tracking
- Ride request and booking system
- Payment processing integration

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **PostgreSQL** - Database for storing user and ride information
- **Drizzle ORM** - Database ORM
- **Socket.IO** - Real-time communication for location tracking
- **JWT** - Authentication tokens

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/farmanali6349/uber-clone-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your environment variables:

   ```env
   PORT=3000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```

4. Run database migrations:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes

#### User Registration

- **Endpoint**: `POST /api/users/register`
- **Description**: Register a new user account
- **Authentication**: Not required

##### Request Body

```json
{
  "firstname": "string (3-50 characters)",
  "lastname": "string (3-50 characters, optional)",
  "email": "string (valid email format, max 128 characters)",
  "password": "string (minimum 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character)"
}
```

##### Success Response

- **Status Code**: `201 Created`
- **Response Body**:

```json
{
  "success": true,
  "message": "User Created Successfully",
  "id": "integer",
  "data": {
    "id": "integer",
    "firstname": "string",
    "lastname": "string",
    "email": "string"
  },
  "authToken": "string (JWT token for authentication)"
}
```

##### Error Responses

- **Status Code**: `400 Bad Request`
  - When validation fails
  - When email already exists
  - When request body is invalid

  ```json
  {
    "success": false,
    "message": "Invalid Register Body | Unable to register User, Email already exist",
    "error": "string or object with validation details"
  }
  ```

- **Status Code**: `500 Internal Server Error`
  - When unexpected server error occurs

  ```json
  {
    "success": false,
    "message": "Error occured while registering user",
    "error": "string (detailed error in development only)"
  }
  ```

## Project Structure

```
src/
├── controllers/    # Request handlers
├── db/            # Database configuration and schemas
├── middleware/    # Custom middleware functions
├── routes/        # API route definitions
├── utils/         # Utility functions
├── validation/    # Input validation schemas
└── config/        # Configuration files
```

## Database Schema

### Users Table

```sql
users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(128) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  socket_id TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the ISC License.

## Contact

Farman Ali - [@farmanali6349](https://github.com/farmanali6349)

Project Link: [https://github.com/farmanali6349/uber-clone-backend](https://github.com/farmanali6349/uber-clone-backend)
