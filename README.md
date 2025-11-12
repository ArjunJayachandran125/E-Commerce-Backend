# E-Commerce Backend API

A RESTful backend for managing users, products, and orders with authentication and authorization. Built with Node.js, Express, and MongoDB.

## Description

This is a Node.js backend application for an e-commerce platform. 
It provides RESTful APIs for:

- User registration and login (JWT authentication)
- Product management (CRUD)
- Order management (create orders, calculate total price)
- Pagination, filtering, and sorting for products
- Input validation using Joi

## Features

- User signup and login with JWT
- Product CRUD with validations
- Pagination, filtering, and sorting for product listings
- Order creation with total price calculation
- Secure password hashing using bcrypt
- Global error handling with express-async-handler

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Joi for validation
- bcrypt for password hashing
- jsonwebtoken for authentication

## Installation

### 1. Clone the repository:
- git clone https://github.com/ArjunJayachandran125/ecommerce-backend.git

### 2. Install dependencies:
- npm install

### 3. Create a .env file in the root directory with the following variables:
- PORT=5000
- MONGO_URL=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRY=1d

### 4. Start the development server:
- npm start

## API Endpoints

### Users
- POST /api/users/signup → Register a new user
- POST /api/users/login → Login user

### Products
- GET /api/products → Get all products (supports pagination, filtering, sorting)
- POST /api/products → Create product (protected)
- GET /api/products/:id → Get product by ID
- PUT /api/products/:id → Update product (protected)
- DELETE /api/products/:id → Delete product (protected)

### Orders
- POST /api/orders → Create order (protected)
- GET /api/orders/:id → Get order by ID (protected)

## Folder Structure
ecommerce-backend/
│
├── config/         
├── controllers/    
├── middleware/     
├── models/         
├── routes/         
├── utils/         
├── uploads/      
├── app.js
└── server.js