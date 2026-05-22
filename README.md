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

Usage
To boot both the backend API server and the React frontend client concurrently in a hot-reloading development state, execute the following commands in separate terminals:

Terminal 1 (Backend API):

Bash
npm run dev
Terminal 2 (Frontend Client UI):

Bash
cd frontend && npm start



React – A declarative component runtime engine driving the client-side single-page application experience.
