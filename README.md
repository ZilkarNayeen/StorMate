# StorMate

StorMate is a full-stack inventory and order management platform for businesses that need to manage stock, suppliers, categories, and transactions in a structured, role-based system. It is designed for multi-tenant operations, where each business has isolated data and controlled access for admins, staff, and superadmins.

## Overview

This project combines a React frontend with an Express + MongoDB backend to deliver a modern inventory dashboard for operational teams. It supports product tracking, stock updates, supplier management, order handling, and access control across multiple business tenants.

## Key Features

- Multi-tenant architecture with business-scoped data isolation
- Product, category, and supplier management
- Order tracking and transaction history
- Real-time stock movement logging
- Role-based access control for admin, staff, and superadmin users
- JWT-based authentication and protected API routes
- Swagger API documentation
- Dockerized local development setup

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Authentication: JWT, bcrypt
- API Docs: Swagger UI
- Deployment / Local Setup: Docker Compose

## Project Structure

```text
StorMate-main/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── seed.js
│   ├── swagger.js
│   └── package.json
├── Dockerfile
├── docker-compose.yml
├── LICENSE
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or a remote MongoDB URI
- npm
- Docker + Docker Compose (optional)

### Backend Configuration

Create a `.env` file inside the `server` directory:

```env
PORT=5713
MONGO_URI=mongodb://127.0.0.1:27017/storemate
JWT_SECRET=your_super_secret_key
```

### Frontend Configuration

If needed, create a `.env` file in `frontend`:

```env
VITE_API_BASE_URL=http://localhost:5713/api
```

### Install Dependencies

```bash
cd server
npm install

cd ../frontend
npm install
```

### Seed Demo Data

```bash
cd ../server
node seed.js
```

This creates sample businesses, users, products, suppliers, and categories.

### Run the Application

Start the backend:

```bash
cd server
npm start
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The app should be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5713
- Swagger Docs: http://localhost:5713/api-docs

## Demo Accounts

The seed script creates sample users for testing:

| Role | Email | Password |
| --- | --- | --- |
| Superadmin | owner@storemate.com | ownersuperadmin |
| Admin | admin@techcorp.com | admintech |
| Staff | staff@techcorp.com | stafftech |
| Admin | admin@fashionhub.com | adminfashion |
| Staff | staff@fashionhub.com | stafffashion |

## API Overview

Main backend routes include:

- `/api/auth` for login and authentication
- `/api/products` for product management
- `/api/categories` for category management
- `/api/suppliers` for suppliers
- `/api/orders` for orders
- `/api/itemTransaction` for stock history
- `/api/users` for user management

## Docker Setup

To run the project with Docker Compose:

```bash
docker compose up --build
```

This starts the backend and MongoDB container with the default project configuration.

## Deployment Notes

For deployment, configure environment variables in your hosting platform or container environment:

- set `PORT`
- set `MONGO_URI`
- set `JWT_SECRET`
- ensure the frontend `VITE_API_BASE_URL` points to the deployed backend

A typical production deployment flow is:

1. deploy the backend to a Node.js host or container
2. deploy the frontend to Vercel, Netlify, or similar static host
3. connect both to the same MongoDB instance
4. run the seed script once if demo data is required

## Screenshots

Add screenshots in the repository to showcase the dashboard, product management, orders, and inventory views.

Example structure:

```text
/screenshots/
├── dashboard.png
├── products.png
├── orders.png
└── login.png
```

Then reference them in the README:

```md
![Dashboard](./screenshots/dashboard.png)
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. If you would like to improve the project, open an issue or submit a pull request with a clear description of the change.
