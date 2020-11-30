import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"



export default class AddForumForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
      // need the following to prevent crashing
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      event.preventDefault(); // this is needed to make it work
      db.ref('/forums/' + this.state.name).update({
        name: this.state.name,
      });
      alert("submitting: " + this.state.name);
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }
    render() {
      return (
        <div>
          <h2>Create A Forum</h2>
          <form onSubmit={this.handleSubmit}>
            <p>Enter the name of the course you want to add:</p>
            <input type="text" name="name" onChange={this.handleChange} 
                    placeholder="Enter course name" />
            <input type="submit" />
          </form>
        </div>
      )
    }
  }