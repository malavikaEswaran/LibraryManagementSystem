# Library Management System - Report Guide

## 1. Title
Library Management System – CRUD-Based Web Application

## 2. Problem Statement
Managing library book records manually can take time and may cause errors. This application provides a simple web interface to add, view, update and delete book records.

## 3. Objectives
- Develop a functional web application.
- Implement CRUD operations.
- Store book data in MySQL.
- Connect frontend and backend using REST APIs.
- Validate user input.
- Test APIs using Postman.

## 4. Technology Stack
HTML, CSS, JavaScript, Spring Boot, Java, MySQL, REST API, Postman, GitHub.

## 5. Modules
- Add Book
- View Books
- Update Book
- Delete Book
- Search Books
- Validation

## 6. Database
Table: books

Fields:
id, title, author, category, isbn, quantity, available_quantity.

## 7. CRUD
Create: POST /api/books
Read: GET /api/books
Update: PUT /api/books/{id}
Delete: DELETE /api/books/{id}

## 8. Testing
Take screenshots of:
1. Application home page
2. Add book form
3. Successfully added book
4. Book list
5. Edit operation
6. Delete operation
7. Postman POST request
8. Postman GET request
9. Postman PUT request
10. Postman DELETE request
11. MySQL books table
12. GitHub repository

## 9. Architecture
User → Frontend → REST API → Spring Boot → JPA/Hibernate → MySQL

## 10. Future Enhancements
- User login
- Student/member management
- Book issue and return
- Fine calculation
- Admin dashboard
- Authentication and authorization
