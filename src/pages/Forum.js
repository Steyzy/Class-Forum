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
    const index = event.target.options.selectedIndex;
    this.setState({ currForum: event.target.options[index].getAttribute('my_key'),
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
            View a Forum
          </a>
          <a class="btn btn-primary" data-toggle="collapse" href="#listForum"
          role="button" aria-expanded="false" aria-controls="listForum">
            Join a Forum
          </a>
        </p>
        <div className='grid-container'>
          <div class="container">
            <div class="row collapse" id="addForum">
              <div className='left'>
                <AddForumForm/>
              </div> 
            </div>
            <div class="row collapse" id="listForum">
              <div className='left'>
                <ListForums/>
              </div>        
            </div>      
            <div class="row collapse" id="joinedForums">
              <div className='left'>
                <JoinedForums onChange={this.handleForumSwitch}/>
            </div>
              {/* </div> */}
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