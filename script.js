const API_URL = "http://localhost:8080/api/books";
let books = [];

document.addEventListener("DOMContentLoaded", loadBooks);

async function loadBooks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Backend is not available");
    books = await response.json();
    displayBooks();
  } catch (error) {
    showMessage("Cannot connect to backend. Start Spring Boot first.", true);
  }
}

function displayBooks() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search) ||
    book.author.toLowerCase().includes(search) ||
    book.category.toLowerCase().includes(search)
  );

  const table = document.getElementById("bookTable");

  if (filtered.length === 0) {
    table.innerHTML = `<tr><td colspan="8">No books found.</td></tr>`;
    return;
  }

  table.innerHTML = filtered.map(book => `
    <tr>
      <td>${book.id}</td>
      <td>${escapeHtml(book.title)}</td>
      <td>${escapeHtml(book.author)}</td>
      <td>${escapeHtml(book.category)}</td>
      <td>${escapeHtml(book.isbn)}</td>
      <td>${book.quantity}</td>
      <td>${book.availableQuantity}</td>
      <td>
        <button onclick="editBook(${book.id})">Edit</button>
        <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

document.getElementById("bookForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const id = document.getElementById("bookId").value;

  const quantity = Number(document.getElementById("quantity").value);
  const availableQuantity = Number(document.getElementById("availableQuantity").value);

  if (availableQuantity > quantity) {
    showMessage("Available quantity cannot be greater than total quantity.", true);
    return;
  }

  const book = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    category: document.getElementById("category").value.trim(),
    isbn: document.getElementById("isbn").value.trim(),
    quantity,
    availableQuantity
  };

  try {
    const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Operation failed");
    }

    showMessage(id ? "Book updated successfully." : "Book added successfully.");
    resetForm();
    await loadBooks();
  } catch (error) {
    showMessage(error.message, true);
  }
});

function editBook(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById("bookId").value = book.id;
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("category").value = book.category;
  document.getElementById("isbn").value = book.isbn;
  document.getElementById("quantity").value = book.quantity;
  document.getElementById("availableQuantity").value = book.availableQuantity;
  document.getElementById("formTitle").textContent = "Edit Book";
  window.scrollTo({top: 0, behavior: "smooth"});
}

async function deleteBook(id) {
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Delete failed");

    showMessage("Book deleted successfully.");
    await loadBooks();
  } catch (error) {
    showMessage(error.message, true);
  }
}

function resetForm() {
  document.getElementById("bookForm").reset();
  document.getElementById("bookId").value = "";
  document.getElementById("formTitle").textContent = "Add Book";
}

function showMessage(text, error = false) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.style.color = error ? "crimson" : "green";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
