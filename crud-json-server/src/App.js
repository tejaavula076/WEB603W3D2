import React, { Component } from "react";
import Lists from "./Lists";

class App extends Component {

  constructor(){
    super();

    this.state = {
      loading:true,
      alldata:[]
    }
  }

  getLists = () => {

    fetch("http://localhost:5000/posts")
    .then(res=>res.json())
    .then(result => {

      this.setState({
        loading:false,
        alldata:result
      });

    })
    .catch(console.log);

  }

  render(){

    let loading;

    if(this.state.loading){
      loading = <p>Loading Data .... Please be patient</p>
    }
    else{
      loading = <Lists alldata={this.state.alldata}/>
    }

    return(

      <div className="container">

        <span className="title-bar">

          <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
          >

          Get Lists

          </button>

        </span>

        {loading}

      </div>

    );
  }

}

export default App;