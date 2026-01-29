# FatePop Backend API

Backend API for FatePop mobile application built with NestJS, Prisma, PostgreSQL, and Swagger.

## Prerequisites

- Node.js (v16+)
- PostgreSQL Database
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd fatepopback
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the root directory.
   - Add your database URL and JWT Secret:
     ```
     DATABASE_URL="postgresql://user:password@localhost:5432/fatepop_db?schema=public"
     JWT_SECRET="your_secure_secret"
     ```

4. Initialize Database:
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Push schema to database
   npx prisma db push
   ```

## Running the App

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## API Documentation

The API is documented using Swagger. Once the application is running, access the documentation at:

http://localhost:3000/api

## API Endpoints

### Auth
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive JWT
- `GET /auth/profile`: Get current user profile (Protected)

## Project Structure

- `src/prisma`: Database connection module
- `src/users`: User management module
- `src/auth`: Authentication logic (JWT, Strategies, Guards)
