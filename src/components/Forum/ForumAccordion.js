import React, { Component } from "react"
import AddForumForm from './AddForumForm';
import ListForums from './ListForums';
import JoinedForums from './JoinedForums';

export default function ForumAccordion(props) {
  return (
<div id="myGroup" className='left'>
  <button class="btn dropdown" data-toggle="collapse" data-target="#view">
    <i class="icon-chevron-right"></i> View a Forum
  </button>
  <button class="btn dropdown" data-toggle="collapse" data-target="#join">
    <i class="icon-chevron-right"></i> Join a Forum
  </button>
  <button class="btn dropdown" data-toggle="collapse" data-target="#create">
    <i class="icon-chevron-right"></i> Create a Forum 
  </button>

  <div class="accordion-group pb-4 mb-0">
      <div class="collapse" id="join"  data-parent="#myGroup">
        <ListForums/>
      </div>
      <div class="collapse indent" id="view"  data-parent="#myGroup">
        <JoinedForums onChange={props.handleChange}/>
      </div>
      <div class="collapse indent" id="create"  data-parent="#myGroup">
        <AddForumForm/>
      </div>
  </div>
</div>
  )
}