import React, { Component } from "react"
import Navbar from '../components/Navbar';
import AddForumForm from '../components/Forum/AddForumForm';
import ListForums from '../components/Forum/ListForums';
import JoinedForums from '../components/Forum/JoinedForums';
import CurrentForum from '../components/Forum/CurrentForum';
import '../Styling/Forum.css'
import CurrentPost from '../components/Forum/CurrentPost';
import ForumNav from '../components/Forum/ForumNav';
import ForumAccordion from '../components/Forum/ForumAccordion';

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
        <ForumAccordion handleChange={this.handleForumSwitch}/>
        <div class="grid-container pt-1 mb-2 pb-3 mt=0" style={{backgroundColor: "rgb(255,229,234)"}}>
          <CurrentForum currForum={this.state.currForum}
                        handlePostSwitch={this.handlePostSwitch}/>
        </div>
        <div class="grid-container pt-1 pb-3 m-0" style={{backgroundColor: "rgb(232, 239, 248)"}}>
          <CurrentPost currPostId = {this.state.currPostId}/>  
        </div>       
      </div>
    );
  }
}