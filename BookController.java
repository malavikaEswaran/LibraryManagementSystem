package com.library.controller;

import com.library.model.Book;
import com.library.repository.BookRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookRepository repository;

    public BookController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id) {
        return repository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(java.util.Map.of("message", "Book not found")));
    }

    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book) {
        if (repository.existsByIsbn(book.getIsbn())) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", "ISBN already exists"));
        }

        if (book.getAvailableQuantity() > book.getQuantity()) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", "Available quantity cannot be greater than total quantity"));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @Valid @RequestBody Book updated) {
        return repository.findById(id).map(book -> {
            if (repository.existsByIsbnAndIdNot(updated.getIsbn(), id)) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("message", "ISBN already exists"));
            }

            if (updated.getAvailableQuantity() > updated.getQuantity()) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("message", "Available quantity cannot be greater than total quantity"));
            }

            book.setTitle(updated.getTitle());
            book.setAuthor(updated.getAuthor());
            book.setCategory(updated.getCategory());
            book.setIsbn(updated.getIsbn());
            book.setQuantity(updated.getQuantity());
            book.setAvailableQuantity(updated.getAvailableQuantity());

            return ResponseEntity.ok(repository.save(book));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(java.util.Map.of("message", "Book not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(java.util.Map.of("message", "Book not found"));
        }

        repository.deleteById(id);
        return ResponseEntity.ok(java.util.Map.of("message", "Book deleted successfully"));
    }
}
