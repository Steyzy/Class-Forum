import React, { Component } from "react"
import { db } from "../../services/firebase.js"



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
      db.ref('/forums/cs97').set({
        value: "cs33"
      });
      alert("submitting: " + this.state.name);
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <p>Enter the name of the course you want to add:</p>
          <input type="text" name="name" onChange={this.handleChange} />
          <input type="submit" />
        </form>
      )
    }
  }