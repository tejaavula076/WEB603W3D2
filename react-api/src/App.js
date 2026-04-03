// import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Contacts from "./components/Contacts";
// import axios from "axios"; 

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       contacts: []
//     };
//   }

//   componentDidMount() {
//     axios.get("http://jsonplaceholder.typicode.com/users")   
//       .then((response) => {
//         this.setState({
//           contacts: response.data   
//         });
//       })
//       .catch((error) => console.log(error));
//     // fetch("http://jsonplaceholder.typicode.com/users")
//     //   .then((res) => res.json())
//     //   .then((result) => {
//     //     this.setState({
//     //       contacts: result
//     //     });
//     //   })
//     //   .catch((error) => console.log(error));
//   }

//   render() {
//     return (
//       <div className="container mt-4">
//         <Contacts contacts={this.state.contacts} />
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      editingBook: null
    };
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        this.setState({
          books: response.data
        });
      })
      .catch((error) => console.log(error));
  };

  handleSave = (book) => {
    if (book._id) {
      axios
        .put("http://localhost:8080/api/book", book)
        .then(() => {
          this.setState({ editingBook: null });
          this.loadBooks();
        })
        .catch((error) => console.log("UPDATE ERROR:", error));
    } else {
      axios
        .post("http://localhost:8080/api/book", book)
        .then(() => {
          this.loadBooks();
        })
        .catch((error) => console.log("ADD ERROR:", error));
    }
  };

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/book/${id}`)
      .then(() => {
        this.loadBooks();
      })
      .catch((error) => console.log("DELETE ERROR:", error));
  };

  handleEdit = (book) => {
    this.setState({
      editingBook: book
    });
  };

  handleCancel = () => {
    this.setState({
      editingBook: null
    });
  };

  render() {
    return (
      <div className="container mt-4">
        <BookForm
          onSave={this.handleSave}
          editingBook={this.state.editingBook}
          onCancel={this.handleCancel}
        />

        <BookList
          books={this.state.books}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default App;