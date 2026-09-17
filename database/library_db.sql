CREATE DATABASE IF NOT EXISTS library_management;
USE library_management;

CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(80) NOT NULL,
    isbn VARCHAR(30) NOT NULL UNIQUE,
    quantity INT NOT NULL,
    available_quantity INT NOT NULL
);

INSERT INTO books (title, author, category, isbn, quantity, available_quantity)
VALUES
('Java Programming', 'Herbert Schildt', 'Programming', 'ISBN001', 5, 5),
('Python Basics', 'Mark Lutz', 'Programming', 'ISBN002', 4, 4),
('Artificial Intelligence', 'Stuart Russell', 'AI', 'ISBN003', 3, 2);
