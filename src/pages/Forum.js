import React, { Component } from "react"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';
import ListForums from '../components/Forum/ListForums';
import JoinedForums from '../components/Forum/JoinedForums';


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
        <hr/>
        <AddForumForm/>
        <hr/>
        <ListForums/>
        <hr/>
        <JoinedForums/>
        <hr/>
      </div>
    );
  }
}