Inventory Management API

A simple Inventory Management REST API built with Node.js, Express, and MongoDB.
This API allows managing users, products, and orders with authentication.

Features

User authentication (signup/login)

CRUD operations for products

CRUD operations for orders

JWT-based protected routes

Seed script to populate initial data

Project Structure
inventory-api/
│
├─ config/           # Database configuration
├─ controllers/      # API controllers for auth, products, orders
├─ middleware/       # Auth middleware
├─ models/           # Mongoose models (User, Product, Order)
├─ routes/           # API routes
├─ scripts/          # Seed script for initial data
├─ validations/      # Request validation logic
├─ server.js         # Entry point
├─ package.json      # Project dependencies
└─ .env              # Environment variables

Installation

Clone the repo:

git clone https://github.com/donjesuskayiranga-coder/inventory-management.git
cd inventory-management


Install dependencies:

npm install


Create a .env file in the root:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

Running the API

Start the server:

npm start


Or with nodemon (auto-reload on changes):

npm run dev

Seed Initial Data

Populate the database with initial users, products, and orders:

node scripts/seed.js

API Endpoints
Auth

POST /api/auth/register – Register a new user

POST /api/auth/login – Login user and get JWT token

Products

GET /api/products – List all products

GET /api/products/:id – Get product by ID

POST /api/products – Create a product (auth required)

PUT /api/products/:id – Update product (auth required)

DELETE /api/products/:id – Delete product (auth required)

Orders

GET /api/orders – List all orders (auth required)

GET /api/orders/:id – Get order by ID (auth required)

POST /api/orders – Create an order (auth required)

PUT /api/orders/:id – Update an order (auth required)

DELETE /api/orders/:id – Delete an order (auth required)

Environment Variables
Variable	Description
PORT	Port for running the server
MONGO_URI	MongoDB connection URI
JWT_SECRET	Secret key for JWT authentication
Dependencies

express

mongoose

bcryptjs

jsonwebtoken

dotenv

nodemon (dev)

Author

Don Jesus Kayiranga – GitHub
