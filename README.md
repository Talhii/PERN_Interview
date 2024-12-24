# CRUD Application with React and Node.js

This is a full-stack CRUD (Create, Read, Update, Delete) application built with React, Node.js, and PostgreSQL. The application features a paginated dashboard interface for managing items.

## Project Structure

The project is divided into two main directories:

- `client/`: React frontend application
- `server/`: Node.js backend application

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL
- npm (Node Package Manager)

## Quick Start

### Setting up the Database

1. Make sure PostgreSQL is running on your system
2. Update the database credentials in `server/.env` file
3. Run the database schema:
```bash
cd server
psql -U postgres -f src/db/schema.sql
```

### Starting the Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following content:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crud_db
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:3000

### Starting the Frontend

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open in your default browser at http://localhost:5173

## Features

- Create, Read, Update, and Delete items
- Paginated dashboard with 5 items per page
- Modern Material-UI interface
- PostgreSQL database integration
- RESTful API endpoints
- TypeScript support for both frontend and backend

## API Endpoints

- GET `/api/items`: Get all items (with pagination)
- GET `/api/items/:id`: Get a single item
- POST `/api/items`: Create a new item
- PUT `/api/items/:id`: Update an existing item
- DELETE `/api/items/:id`: Delete an item

## Technologies Used

### Frontend
- React
- TypeScript
- Material-UI
- Axios
- Vite

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- pg (node-postgres)
