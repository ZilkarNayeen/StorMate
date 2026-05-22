# StorMate _(stormate)_

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
![Standard Readme](https://img.shields.io/badge/standard%20readme-yes-brightgreen?style=flat-square)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg?style=flat-square)

A modern multi-tenant inventory and order management web platform built with Node.js, Express, MongoDB, and React.

## Table of Contents
- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Extra Sections](#extra-sections)
- [API](#api)
- [Maintainers](#maintainers)
- [Thanks](#thanks)
- [Contributing](#contributing)
- [License](#license)
- [Definitions](#definitions)

---

## Security
The application enforces stateless authentication via JSON Web Tokens (JWT) coupled with customized cryptographic verification middleware (`protect`, `adminOnly`). Passwords undergo an irreversible salted transformation via `bcryptjs` using a work factor calculation metric of 10 prior to database persistence.

To ensure logical multi-tenant isolation, backend API route controllers bypass tenant identity variables supplied by the client interface; instead, the active `businessId` scope is extracted directly from the validated backend JWT payload to prevent ID-spoofing and parameter pollution. For production deployments, the application must be served over HTTPS, utilize Helmet middleware for HTTP header hardening, and implement rate-limiting protections.

---

## Background
StorMate was engineered to provide small‑to‑medium enterprises (MSMEs) with a single pane of glass for managing suppliers, products, and complex purchase order workflows. It abstracts away manual spreadsheets by introducing a structured, relational-style system on top of a scalable, non-relational MongoDB database layer.

The project implements a logical data isolation model, routing separate corporate accounts through a single database cluster while structurally guaranteeing absolute partition privacy. This decoupled architecture optimizes shared server usage, demonstrating advanced database engineering principles, custom access middleware, and web scalability suitable for advanced computer science tracks and professional technical evaluations.

---

## Install

### Prerequisites
* [Node.js](https://nodejs.org/) (>= Version 18.0.0)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally or an active MongoDB Atlas cloud URI.

### Setup Instructions
Clone the repository, navigate to the project root directory, and execute the installation commands:

```bash
# Install core server dependencies
npm install

# Install client UI dependencies
cd frontend && npm install && cd ..

# Generate your environmental configuration file
cat > .env <<EOF
MONGO_URI=mongodb://localhost:27017/storemate
JWT_SECRET=your_custom_cryptographic_signing_key
PORT=5713
EOF

##Usage
To boot both the backend API server and the React frontend client concurrently in a hot-reloading development state, execute the following commands in separate terminals:

Terminal 1 (Backend API):

Bash
npm run dev
Terminal 2 (Frontend Client UI):

Bash
cd frontend && npm start
The client user interface will initialize at http://localhost:3000 and automatically proxy application requests to the backend service listening on port 5713.

##CLI
The project does not expose a dedicated CLI beyond the npm lifecycle scripts outlined above.

Importable
The backend architecture can be imported cleanly as an independent module layer, exporting the configured Express framework app:

JavaScript
import app from './server/index.js';
export default app;
##Extra Sections
Database Performance Optimization
To maintain strict structural isolation and quick query performance across shared collections, compound indexes are applied at the Mongoose schema level. This forces MongoDB to partition search boundaries within a tenant's domain, optimizing search queries and preventing full-table collection scans:

JavaScript
// Example compound index applied to multi-tenant collections
productSchema.index({ businessId: 1, _id: 1 });
productSchema.index({ businessId: 1, category: 1 });
##API
All application resources are served behind the /api route prefix.

Auth
POST /api/auth/login – Authenticates credentials and returns a signed, stateless JWT access token.

Business (Superadmin / Admin Privileges Required)
POST /api/businesses – Provisions a new, logically isolated business tenant organization.

GET /api/businesses – Returns a structured list of all registered business entities.

PUT /api/businesses/:id – Modifies parameters of a specific tenant profile.

DELETE /api/businesses/:id – Drops a business profile from the management registry.

Orders (Authenticated Users Only)
GET /api/orders – Fetches transaction histories strictly bounded by the user's active businessId.

POST /api/orders – Generates a new purchase invoice featuring an auto‑generated, sequential orderNumber.

PUT /api/orders/:id – Updates order statuses or line items.

DELETE /api/orders/:id – Removes a transaction record from active ledger pools.

##Maintainers
Hossain Md Nayeen Zilkar – GitHub Profile — Email: your.email@uwindsor.ca

##Thanks
Special acknowledgement to the open‑source ecosystem and the contributors behind Node.js, Express, Mongoose, React, Tailwind CSS, and the associated dependencies that made building this platform architecture possible.

##Contributing
We welcome patches, features, and structural updates. To contribute to StorMate:

Open a detailed tracker issue to review major architectural changes.

Fork this repository workspace and develop your features inside an isolated branch.

Align code implementations with the project design parameters (enforced via ESLint and Prettier configs).

Verify all tests pass cleanly prior to generating a Pull Request.

##License
MIT © 2026 Hossain Md Nayeen Zilkar. See the local LICENSE file for comprehensive copyright and permissions data.

##Definitions
API – Application Programming Interface; the structured layer of HTTP endpoints managing system communications.

JWT – JSON Web Token; a cryptographically signed compact structure used for stateless client session identification.

CRUD – Create, Read, Update, Delete; the fundamental data manipulation interactions.

Mongoose – Object Data Modeling (ODM) library used to structure schema rules over MongoDB collections.

React – A declarative component runtime engine driving the client-side single-page application experience.

