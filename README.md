# Project Management Server

A robust TypeScript-based REST API server for managing projects and users with role-based access control, JWT authentication, and email invitations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Testing](#testing)
- [Docker Support](#docker-support)
- [Contributing](#contributing)

## ✨ Features

- **User Management**: Create, update, and manage users with role-based access control
- **Project Management**: Create, read, update, and delete projects
- **Authentication**: JWT-based authentication with secure password hashing
- **Authorization**: Role-based access control (Admin, Staff)
- **Email Invitations**: Send project invitations via email using Nodemailer
- **Rate Limiting**: Configured rate limiting to prevent abuse
- **Security**: Helmet.js for HTTP headers security, CORS support
- **Error Handling**: Comprehensive error handling middleware
- **Validation**: Input validation using Zod
- **Logging**: Morgan HTTP request logger
- **Testing**: Jest configuration for unit and integration tests
- **Docker Support**: Docker and Docker Compose configurations for containerization

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **Security**:
  - Helmet.js for HTTP security headers
  - bcryptjs for password hashing
  - CORS for cross-origin resource sharing
  - Express Rate Limit
- **Validation**: Zod
- **Testing**: Jest with Supertest
- **Development Tools**: ts-node, nodemon, ESLint, Prettier

## 📁 Project Structure

```
src/
├── app.ts                          # Express app configuration
├── server.ts                       # Server entry point
├── config/                         # Configuration files
│   ├── config.ts                  # Environment configuration
│   ├── mongoose.ts                # MongoDB connection setup
│   ├── nodemailer.ts              # Email service configuration
│   ├── rateLimit.ts               # Rate limiting configuration
│   └── statusCodes.ts             # HTTP status codes
├── controllers/                    # Request handlers
│   ├── auth.controller.ts         # Authentication logic
│   ├── project.controller.ts      # Project operations
│   └── user.controller.ts         # User operations
├── middlewares/                    # Express middlewares
│   ├── authenticationHandler.ts   # JWT verification
│   ├── authRoleHandler.ts         # Role-based access control
│   ├── errorHandler.ts            # Global error handling
│   └── validationHandler.ts       # Input validation
├── model/                          # MongoDB schemas
│   ├── user.model.ts              # User schema
│   ├── project.model.ts           # Project schema
│   └── invite.model.ts            # Invitation schema
├── routes/                         # API route definitions
│   ├── index.ts                   # Route aggregator
│   ├── auth.route.ts              # Authentication routes
│   ├── project.route.ts           # Project routes
│   └── user.route.ts              # User routes
├── services/                       # Business logic services
│   └── sendInvitationEmail.ts     # Email sending service
├── types/                          # TypeScript type definitions
│   ├── common.ts                  # Common types
│   └── express/
│       └── express.d.ts           # Express type extensions
├── validations/                    # Input validation schemas
│   ├── auth.validations.ts        # Auth validation schemas
│   └── project.validation.ts      # Project validation schemas
├── libs/                           # Utility libraries
│   └── asyncHandle.ts             # Async error handler wrapper
└── tests/                          # Test files
    └── api_tests/
        └── auth.test.ts           # Authentication tests
```

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- (Optional) Docker and Docker Compose

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project-management-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

## 🔧 Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080
NODE_ENV=development
API_PREFIX=/api

# Client Configuration
CLIENT_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

# Database
MONGO_URL=mongodb://localhost:27017/project-management

# JWT
JWT_SECRET=your-secret-key-here

# Email Service (Mailtrap)
MAILTRAP_USER=your-mailtrap-user
MAILTRAP_PASS=your-mailtrap-password

# Pagination
DATA_PER_PAGE=10
```

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

This runs the server with auto-reload on file changes using nodemon.

### Production Build

```bash
npm run build
npm start
```

### Watch Tests

```bash
npm run test:watch
```

### Run Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## 🐳 Docker Support

### Build Docker Image

```bash
npm run docker-build
```

### Run Docker Container

```bash
npm run docker-run
```

### Development Docker with Volume Mount

```bash
npm run docker-dev
npm run docker-dev-run
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `POST /refresh-token` - Refresh JWT token

### Project Routes (`/api/project`) - Protected

- `GET /` - Get all projects
- `POST /` - Create a new project
- `GET /:id` - Get project by ID
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project
- `POST /:id/invite` - Invite user to project

### User Routes (`/api/user`) - Protected (Admin only)

- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers and logs in
2. Server returns JWT token
3. Include token in `Authorization` header: `Bearer <token>`
4. Token is verified on protected routes
5. Tokens have expiration time and can be refreshed

## ✅ Testing

Run the test suite:

```bash
npm test
```

Tests are located in `src/tests/` directory using Jest and Supertest for API testing.

## 👨‍💻 Author

**Iqbal Hossen**

## 📄 License

ISC
