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

## Guide d'Intégration Frontend

Voici les étapes pour connecter votre application frontend (React, Vue, Mobile, etc.) à l'API.

### 1. URL de Base
L'API est accessible à l'adresse suivante en local :
`http://localhost:3000`

### 2. Configuration CORS
Par défaut, NestJS peut bloquer les requêtes venant d'un autre port (comme une app React sur le port 5173).
Pour autoriser votre frontend, assurez-vous que CORS est activé dans `src/main.ts` :
```typescript
app.enableCors(); // Autorise toutes les origines
// ou pour plus de sécurité :
app.enableCors({
  origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
});
```

### 3. Flux d'Authentification
L'API utilise une authentification par Token JWT (Bearer Token).

#### Étape 1 : Inscription
Envoyez une requête `POST` vers `/auth/register` :
```json
{
  "email": "utilisateur@exemple.com",
  "password": "monMotDePasse123"
}
```

#### Étape 2 : Connexion
Envoyez une requête `POST` vers `/auth/login` avec les mêmes identifiants.
**Réponse :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```
💾 **Important** : Sauvegardez ce token (localStorage, SecureStore, etc.).

#### Étape 3 : Requêtes Protégées
Pour accéder aux routes protégées (comme `/auth/profile` ou autres), ajoutez le Header `Authorization` :
`Authorization: Bearer VOTRE_TOKEN_ICI`

### 4. Documentation API (Swagger)
Pour voir le détail de toutes les routes et tester l'API directement :
👉 http://localhost:3000/api
