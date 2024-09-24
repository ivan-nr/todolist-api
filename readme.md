# Todo List API

This is a RESTful API for a Todo List application built with:

![node js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![ts](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![psql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Features

- User authentication (register, login)
- CRUD operations for todo items
- Pagination todo items
- Input validation
- JWT-based authentication
- PostgreSQL database with Prisma ORM

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or later)
- npm, yarn, or pnpm (recommended: pnpm)
- PostgreSQL database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ivan-nr/todolist-api.git
   cd todolist-api
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables by creating a `.env` file in the root directory:

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/db_name?schema=public"
   JWT_SECRET="your-key"
   ```

4. Run the Prisma migrations to set up your database schema:

   ```bash
   pnpx prisma migrate dev
   ```

   **OR** run the script in package.json

   ```bash
   pnpm prisma:migrate
   ```

5. Build the TypeScript code:

   ```bash
   pnpm build
   ```

6. Start the server:

   ```bash
   pnpm start
   ```

For development, you can use:

```bash
pnpm dev
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive a JWT token

### Todo Items

- `GET /todos` - Get all todos (with pagination)
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Usage

### Registration

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Creating a Todo

```http
POST /todos
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Getting Todos

```http
GET /todos?page=1&limit=10
Authorization: Bearer <your-jwt-token>
```

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

If you have any questions, feel free to contact me at <ivanngudi16@gmail.com>

## Project URL

https://roadmap.sh/projects/todo-list-api
