import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import Post from './Post';


export default class CurrentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPostId: this.props.currPostId,
            currPostTitle: '',
        }

    }
    // function name identified by React, do not change
    componentDidMount(){
        this.setState({ currPostId: this.state.currPostId})
        db.ref('allposts/' + this.props.currPostId).on('value', snapshot => {
            if(snapshot.val() != null){
                this.setState({ currPostTitle: snapshot.val().name })
            }
        })
    }
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ currPostId: props.currPostId})
        db.ref('allposts/' + props.currPostId).on('value', snapshot => {
            if(snapshot.val() != null){
                this.setState({ currPostTitle: snapshot.val().name })
            }
        })
	}
    
    render() {
      return (
            <div style={{textAlign: "center"}}>
                <h2>Current Post:  <br />
                    {this.state.currPostTitle}
                </h2>
                {this.state.currPostId == '' ?
                    <p>Choose a post to view</p>
                    :
                    <Post currPostId={this.state.currPostId}/>                    
                }
            </div>
        )
    }
}