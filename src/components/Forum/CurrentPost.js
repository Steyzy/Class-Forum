import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import Post from './Post';


export default class CurrentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPostId: this.props.currPostId,
        }

    }
    
    componentDidMount(){
      this.setState({ currPostId: this.props.currPostId})
    }
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ currPostId: props.currPostId})
	    }
    
    render() {
      return (
            <div style={{textAlign: "center"}}>
                <h2>Current Post: {this.state.currPost}</h2>
                {this.state.currPostId == '' ?
                    <p>Choose a post to view</p>
                    :
                    <Post currPostId={this.state.currPostId}/>                    
                }
            </div>
        )
    }
}