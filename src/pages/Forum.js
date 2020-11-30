import React, { Component } from "react"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';
import ListForums from '../components/Forum/ListForums';
import JoinedForums from '../components/Forum/JoinedForums';
import CurrentForum from '../components/Forum/CurrentForum';


export default class Forum extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      currForum: '',
    }
    // the following binding is needed for any handle functions
    this.handleForumSwitch = this.handleForumSwitch.bind(this);
  }
  handleForumSwitch(event) {
    this.setState({ currForum: event.target.textContent });
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
        <JoinedForums onClick={this.handleForumSwitch}/>
        <hr/>
        <CurrentForum currForum={this.state.currForum}/>
      </div>
    );
  }
}