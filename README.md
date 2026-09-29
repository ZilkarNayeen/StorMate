# StorMate

A full-stack multi-tenant inventory and business management system designed for modern retail and operational teams.

StorMate helps businesses manage products, suppliers, stock movement, orders, and users across multiple business accounts while keeping each tenant's data isolated and securely scoped.

## Why this project matters

This project was built to solve a real business problem:
- businesses need a clean way to manage inventory and stock
- teams need role-based access control
- owners want multi-business visibility without data leakage
- operations need a simple dashboard for products, suppliers, and transactions

It is a strong portfolio project because it combines:
- full-stack JavaScript development
- authentication and authorization
- multi-tenant architecture
- database design and data modeling
- business workflow logic
- API-driven backend systems

## Live demo

Frontend: https://stor-mate.vercel.app
Backend: https://stormate-8p52.onrender.com/api

## Tech stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- Deployment: Vercel + Render

## Core features

- Multi-tenant business architecture with business-scoped data access
- Role-based access for superadmin, admin, staff, and customer
- Product inventory and stock tracking
- Supplier management
- Order and transaction tracking
- User creation with business-aware permissions
- Protected routes and secure token-based auth
- Dashboard-driven admin workflows
- Responsive UI for operational use

## Business role flow

This project follows a practical SaaS-style access model:

- Superadmin creates business admins
- Business admin creates staff and customers for their business
- Staff manages inventory and transactions within their assigned business
- Customers can be tracked as business users as needed

## Project structure

```bash
StorMate/
├── frontend/                # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                  # Express + MongoDB backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   ├── seed.js
│   ├── index.js
│   └── package.json
├── README.md
├── package.json
├── Dockerfile
├── docker-compose.yml
├── LICENSE
└── .gitignore
```

## Demo accounts

The app includes seeded demo accounts for local setup:

- Superadmin: owner@storemate.com / ownersuperadmin
- Tech Corp Admin: admin@techcorp.com / admintech
- Tech Corp Staff: staff@techcorp.com / stafftech

## Local setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection

### 1. Clone the repository

```bash
git clone https://github.com/ZilkarNayeen/StorMate.git
cd StorMate
```

### 2. Install dependencies

```bash
npm install
cd frontend && npm install && cd ..
cd server && npm install && cd ..
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
PORT=5713
MONGO_URI=mongodb://127.0.0.1:27017/storemate
JWT_SECRET=your_secure_jwt_secret
```

### 4. Seed the database

```bash
cd server
node seed.js
```

### 5. Start the backend

```bash
cd server
npm start
```

### 6. Start the frontend

```bash
cd frontend
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend: http://localhost:5713/api

## API overview

### Authentication
- POST /api/auth/login
- POST /api/auth/register

### Users
- GET /api/users
- POST /api/users/create

### Products
- GET /api/products
- POST /api/products/add
- PUT /api/products/:id
- DELETE /api/products/:id

### Categories
- GET /api/categories
- POST /api/categories/add
- DELETE /api/categories/:id

### Suppliers
- GET /api/suppliers
- POST /api/suppliers/add
- PUT /api/suppliers/:id
- DELETE /api/suppliers/:id

### Orders
- GET /api/orders
- POST /api/orders
- DELETE /api/orders/:id

## Security notes

- JWT-based authentication is used for protected routes
- Passwords are hashed securely using bcrypt
- Business data is restricted by businessId scope
- Only allowed roles can create specific user types

## Portfolio positioning

This project is ideal for a portfolio because it demonstrates real-world product thinking instead of just a tutorial app.

It shows:
- SaaS-style architecture
- multi-tenant access control
- operational business workflows
- practical backend logic
- full-stack delivery from planning to deployment

### Best way to present it in your portfolio

Use this pitch:

> StorMate is a full-stack multi-tenant inventory and business management platform built with React, Node.js, and MongoDB. It models a real-world SaaS workflow where a superadmin creates business admins, admins manage staff and customers, and staff handle inventory, suppliers, and transactions within their business scope.

## License

This project is licensed under the MIT License.

## Acknowledgements

Built for practical business workflow simulation and full-stack portfolio development.
