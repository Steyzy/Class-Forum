import React, { Component } from "react"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';
import ListForums from '../components/Forum/ListForums';
import JoinedForums from '../components/Forum/JoinedForums';
import CurrentForum from '../components/Forum/CurrentForum';
import '../Styling/Forum.css'


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
      <div className='grid-container'>
        <div className='header'>
          <h1>Forum</h1>
        </div>
        <div className='header2'>
          <section><Navbar loggedIn={true}/></section>
        </div>
        <div className='left'><AddForumForm/></div>
        <div className='middle'><ListForums/></div>
        <div className='right'><JoinedForums onClick={this.handleForumSwitch}/></div>             
        <div className='footer'><CurrentForum currForum={this.state.currForum}/></div>
      </div>
    );
  }
}