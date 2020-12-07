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
        <p>
          <a class="btn btn-primary" data-toggle="collapse" href="#addForum"
          role="button" aria-expanded="false" aria-controls="addForum">
            Create a Forum
          </a>
          <a class="btn btn-primary" data-toggle="collapse" href="#joinedForums"
          role="button" aria-expanded="false" aria-controls="joinedForums">
            List My Forums
          </a>
          <a class="btn btn-primary" data-toggle="collapse" href="#listForum"
          role="button" aria-expanded="false" aria-controls="listForum">
            List All Forums
          </a>
        </p>
        <div className='grid-container'>
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div class="row collapse" id="addForum" className='left'><AddForumForm/></div>
                <div class="row collapse" id="listForum" className='middle'><ListForums/></div>
              </div>
              <div class="col-4 collapse" id="joinedForums">
                <div className='right'>
                  <JoinedForums onClick={this.handleForumSwitch}/>
                </div>
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