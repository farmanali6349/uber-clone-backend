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
- **MongoDB** - Database for storing user and ride information
- **Socket.IO** - Real-time communication for location tracking
- **JWT** - Authentication tokens

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
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
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Endpoint             | Method | Description         |
| -------------------- | ------ | ------------------- |
| `/api/auth/register` | POST   | Register a new user |
| `/api/auth/login`    | POST   | Login user          |
| `/api/users/profile` | GET    | Get user profile    |
| `/api/rides/request` | POST   | Request a new ride  |
| `/api/rides/history` | GET    | Get ride history    |

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API route definitions
├── middleware/    # Custom middleware functions
├── utils/         # Utility functions
└── config/        # Configuration files
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
