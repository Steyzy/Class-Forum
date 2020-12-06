import React, { Component } from "react"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';
import ListForums from '../components/Forum/ListForums';
import JoinedForums from '../components/Forum/JoinedForums';
import CurrentForum from '../components/Forum/CurrentForum';
import CurrentPost from '../components/Forum/CurrentPost';

export default class Forum extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      currForum: '',
      currPostId: '',
    }
    // the following binding is needed for any handle functions
    this.handleForumSwitch = this.handleForumSwitch.bind(this);
    this.handlePostSwitch = this.handlePostSwitch.bind(this);
  }
  
  handleForumSwitch(event) {
    this.setState({ currForum: event.target.textContent,
                    currPostId:''});
  }
  
  handlePostSwitch(props)
  {
    this.setState ({ currPostId: props.name});
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
        <CurrentForum currForum={this.state.currForum} 
                      handlePostSwitch={this.handlePostSwitch}/>
        <hr/>
        <CurrentPost currPostId = {this.state.currPostId}/>
      </div>
    );
  }
}