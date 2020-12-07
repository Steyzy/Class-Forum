import React, { Component } from "react"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';
import ListForums from '../components/Forum/ListForums';
import JoinedForums from '../components/Forum/JoinedForums';
import CurrentForum from '../components/Forum/CurrentForum';
import '../Styling/Forum.css'
import CurrentPost from '../components/Forum/CurrentPost';
import ForumNav from '../components/Forum/ForumNav';

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
        <ForumNav/>
        <div className='grid-container'>
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div class="row" className='left'><AddForumForm/></div>
                <div class="row" className='middle'><ListForums/></div>
              </div>
              <div class="col-4">
                <div className='right'><JoinedForums onClick={this.handleForumSwitch}/></div>    
              </div>
            </div>
          </div>
          <div className='footer'><CurrentForum currForum={this.state.currForum}
                                                handlePostSwitch={this.handlePostSwitch}/></div>
          <CurrentPost currPostId = {this.state.currPostId}/>         
        </div>
      </div>
    );
  }
}