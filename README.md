# StorMate: Enterprise Multi-Tenant Inventory & Order Platform

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-%3E%3D%2018.0.0-blue.svg?style=flat-square)
![React Version](https://img.shields.io/badge/React-19-blue.svg?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg?style=flat-square)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)

**StorMate** is an enterprise-grade multi-tenant inventory, supplier, and order management web platform built using Node.js, Express, MongoDB, and React. Engineered with logical data isolation, role-based access control (RBAC), cryptographic JWT authentication, and structuredRESTful APIs.

---

## 🌟 Academic & Portfolio Highlights

Designed as a software engineering showcase for **MSc Computer Science** and **Master of Applied Computing (MAC)** graduate admissions:

* **Logical Multi-Tenant Architecture**: Enforces structural partition privacy across corporate accounts by binding tenant scope (`businessId`) directly to validated backend JWT payloads.
* **Layered System Design**: Enforces separation of concerns using a decoupled `Routes` -> `Controllers` -> `Models` architectural pattern.
* **Cryptographic Security Model**: Implements salted password hashing (`bcrypt`) and stateless token verification (`jsonwebtoken`) with role-based authorization guards.
* **ACID & Schema Integrity**: Enforces database index uniqueness, schema validation constraints, and relational consistency across non-relational MongoDB collections.

---

## 📐 System Architecture

```text
               +----------------------------------+
               |   React SPA (Vite / Tailwind)    |
               +----------------------------------+
                                |  HTTP / REST API
                                v
               +----------------------------------+
               |  Express REST API Gateway        |
               +----------------------------------+
                  /             |              \
                 v              v               v
        +---------------+ +-----------+ +---------------+
        | Auth Guard    | | CORS /    | | Tenant Scope  |
        | Middleware    | | Security  | | Middleware    |
        +---------------+ +-----------+ +---------------+
                                |
                                v
               +----------------------------------+
               |  Controller & Business Logic     |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |  MongoDB / Mongoose ORM Layer    |
               +----------------------------------+
```

---

## 🗄️ Database Entity-Relationship (ER) Model

```text
    +---------------+              +-----------------+
    |   Business    | 1          * |      User       |
    |---------------|--------------|-----------------|
    | _id (PK)      |              | _id (PK)        |
    | name          |              | email (UQ)      |
    | email (UQ)    |              | role (RBAC)     |
    | slug          |              | businessId (FK) |
    +---------------+              +-----------------+
        | 1                            | 1
        |                              |
        | *                            | *
    +---------------+              +-----------------+
    |    Product    |              | ItemTransaction |
    |---------------|              |-----------------|
    | _id (PK)      |              | _id (PK)        |
    | serialNo (UQ) |              | type            |
    | stock         |              | quantity        |
    | price         |              | businessId (FK) |
    | businessId(FK)|              +-----------------+
    +---------------+
```

---

## 📚 API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT | No |

### 📦 Products (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch all business products | Yes |
| `POST` | `/api/products/add` | Create new product record | Yes |
| `PUT` | `/api/products/:id` | Update product details | Yes |
| `DELETE` | `/api/products/:id` | Delete product record | Yes |
| `PUT` | `/api/products/add-stock/:id` | Increment product stock | Yes |
| `PUT` | `/api/products/remove-stock/:id` | Decrement product stock | Yes |

### 📁 Categories (`/api/categories`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Fetch business categories | Yes |
| `POST` | `/api/categories/add` | Add category | Yes |
| `DELETE` | `/api/categories/:id` | Delete category | Yes |

### 🤝 Suppliers (`/api/suppliers`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/suppliers` | Fetch business suppliers | Yes |
| `POST` | `/api/suppliers/add` | Add new supplier | Yes |
| `PUT` | `/api/suppliers/:id` | Update supplier info | Yes |
| `DELETE` | `/api/suppliers/:id` | Delete supplier | Yes |

### 📋 Orders (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | List purchase & sales orders | Yes |
| `POST` | `/api/orders` | Create purchase/sales order | Yes |
| `DELETE` | `/api/orders/:id` | Delete order record | Yes |

---

## 🛠️ Local Installation & Setup Guide

### Prerequisites
* **Node.js**: `>= 18.0.0`
* **MongoDB**: Community Edition running locally (`mongodb://127.0.0.1:27017`) or active MongoDB Atlas connection URI.

### Quickstart

```bash
# 1. Clone repository
git clone https://github.com/ZilkarNayeen/StorMate.git
cd StorMate

# 2. Install dependencies
npm install
cd frontend && npm install && cd ..

# 3. Create server environment configuration
cat > server/.env <<EOF
PORT=5713
MONGO_URI=mongodb://127.0.0.1:27017/storemate
JWT_SECRET=your_jwt_secret_key
EOF

# 4. Seed database with initial sample data
cd server && node seed.js && cd ..

# 5. Start Backend Server
cd server && node index.js

# 6. Start Frontend App (in a separate terminal)
cd frontend && npm run dev
```

---

## 🔒 Security & Tenant Isolation

1. **Backend Verification**: Client-supplied tenant IDs are strictly ignored in request payloads. The API extracts `businessId` directly from decoded JWT tokens attached by the `protect` middleware.
2. **Access Guards**: Role-based access control (`adminOnly`, `protect`) enforces multi-tiered privileges (`superadmin`, `admin`, `staff`, `customer`).
3. **Database Guardrails**: Compound indexes enforce uniqueness per business (e.g. `{ serialNo: 1, businessId: 1 }`).

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
