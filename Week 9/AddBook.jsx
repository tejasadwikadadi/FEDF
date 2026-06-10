import { useState } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [showBooks, setShowBooks] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      isbn,
    };

    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = newBook;
      setBooks(updatedBooks);
      setEditIndex(null);
    } else {
      setBooks([...books, newBook]);
    }

    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  const handleEdit = (index) => {
    setTitle(books[index].title);
    setAuthor(books[index].author);
    setIsbn(books[index].isbn);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2>Library Management System</h2>

      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Author Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>ISBN Number</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <button type="submit">
          {editIndex !== null
            ? "Update Book"
            : "Add Book"}
        </button>
      </form>

      <h3>Total Books : {books.length}</h3>

      <input
        type="text"
        placeholder="Search Book"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type="button"
        onClick={() => setShowBooks(!showBooks)}
      >
        {showBooks
          ? "Hide Books"
          : "Display Books"}
      </button>

      <button
        type="button"
        onClick={() => setBooks([])}
      >
        Clear All Books
      </button>

      {showBooks && (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books
              .filter((book) =>
                book.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(index)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(index)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddBook;