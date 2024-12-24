# Node.js CRUD Backend

This is the backend portion of the CRUD application built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- RESTful API endpoints
- PostgreSQL database integration
- TypeScript support
- Pagination support
- Error handling

## Getting Started

1. Set up PostgreSQL database:
```bash
psql -U postgres -f src/db/schema.sql
```

2. Create `.env` file:
```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crud_db
PORT=3000
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The server will be available at http://localhost:3000

## API Endpoints

### Get Items (with pagination)
```
GET /api/items?page=1&limit=5
```
Response:
```json
{
  "items": [...],
  "totalItems": 10,
  "currentPage": 1,
  "totalPages": 2
}
```

### Get Single Item
```
GET /api/items/:id
```

### Create Item
```
POST /api/items
Content-Type: application/json

{
  "name": "Item Name",
  "description": "Item Description"
}
```

### Update Item
```
PUT /api/items/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated Description"
}
```

### Delete Item
```
DELETE /api/items/:id
```

## Project Structure

- `src/config/`: Configuration files
  - `db.ts`: Database configuration
- `src/routes/`: API routes
  - `items.ts`: CRUD endpoints
- `src/types/`: TypeScript interfaces
- `src/db/`: Database scripts
  - `schema.sql`: Database schema

## Dependencies

- Node.js
- Express
- PostgreSQL
- TypeScript
- pg (node-postgres)
- dotenv
- cors
