import React from "react";

const BookList = ({ books, onDelete, onEdit }) => {
  return (
    <div>
      <h2 className="mb-3">Book List</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => onDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;