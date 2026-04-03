import React, { useState, useEffect } from "react";

const BookForm = ({ onSave, editingBook, onCancel }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    } else {
      setTitle("");
      setAuthor("");
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author
    };

    if (editingBook && editingBook._id) {
      bookData._id = editingBook._id;
    }

    onSave(bookData);

    setTitle("");
    setAuthor("");
  };

  return (
    <div className="mb-4">
      <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BookForm;