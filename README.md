# Library Management System

A simple CRUD-based Library Management System for the VSB Skill Vault Activity 3.

## Technology
- Frontend: HTML, CSS, JavaScript
- Backend: Spring Boot
- Database: MySQL
- API testing: Postman

## Features
- Add book
- View books
- Edit book
- Delete book
- Search books
- Basic validation

## Requirements
- Java 17+
- Maven 3.8+
- MySQL 8+
- VS Code or another Java IDE

## Database setup
Run the SQL in `database/library_db.sql`.

Update MySQL username/password in:
`backend/src/main/resources/application.properties`

## Run backend
Open a terminal in `backend` and run:

```bash
mvn spring-boot:run
```

Backend API:
`http://localhost:8080/api/books`

## Run frontend
Open `frontend/index.html` in a browser. If your browser blocks local API requests, use VS Code Live Server.

## CRUD API
POST   /api/books
GET    /api/books
GET    /api/books/{id}
PUT    /api/books/{id}
DELETE /api/books/{id}

## Project structure
- `frontend/` - user interface
- `backend/` - Spring Boot REST API
- `database/` - SQL setup
- `postman/` - API testing collection
