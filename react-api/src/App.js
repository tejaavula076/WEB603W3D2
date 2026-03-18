import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Contacts from "./components/Contacts";

class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          contacts: result
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container mt-4">
        <Contacts contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;