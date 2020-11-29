import React, { Component } from "react"
import { logout } from "../helpers/auth"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';

export default class Forum extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
    }
  }

  render() {
    return (
      <div>
        <h1>Forum</h1>
        <Navbar loggedIn={true}/>
        <AddForumForm/>
      </div>
    );
  }
}