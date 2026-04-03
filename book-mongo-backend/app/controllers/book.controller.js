const mongoose = require("mongoose");
const Book = mongoose.model("Book");

exports.createBook = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  });

  book
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail",
        error: err.message,
      });
    });
};

exports.getBook = (req, res) => {
  Book.findById(req.params.id)
    .select("-__v")
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving book",
        error: err,
      });
    });
};

exports.books = (req, res) => {
  Book.find()
    .select("-__v")
    .then((bookInfos) => {
      res.status(200).json(bookInfos);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error",
        error: error,
      });
    });
};

exports.deleteBook = (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .select("-__v")
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          message: "No book found",
        });
      }

      res.status(200).json({
        message: "Book deleted",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error deleting",
        error: err.message,
      });
    });
};

exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      author: req.body.author,
    },
    { new: true },
  )
    .select("-__v")
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "Not found",
        });
      }
      res.status(200).json(book);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating",
        error: err.message,
      });
    });
};
