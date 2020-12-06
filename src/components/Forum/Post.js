import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import { Link, Route, useLocation } from 'react-router-dom';
import Profile from "../../pages/Profile.js";


export default class Post extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currPostId: this.props.currPostId,
            comments:[],
            postName:'',
            postContent:'',
            commentContent: '',
        }
        this.handleComment = this.handleComment.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
    }
    
   handleComment(event) {    
        if( this.state.commentContent.trim() == '')
        {
            alert("Comment must be none-empty.")
            return
        }
        const uid = auth().currentUser.uid;
        const commentId = db.ref('/allposts/'+this.state.currPostId).push().key;
        db.ref('/allposts/'+this.state.currPostId+'/'+commentId).set({
            uid: uid,
            content:this.state.commentContent,
        });
        db.ref('users/' + uid + '/comments/' + commentId).set({
            value: true})   // The value is just to keep the node there. There's 
                            // no specific reason to sue boolean value
        alert("Successfully commented!")
    }
    
   
    
    handleChangeComment (event) {
        this.setState({ commentContent: event.target.value })
    }    
  
                
 
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ 
            currPostId: props.currPostId, 
            commentContent: '', // needed to clear the textarea after switching forum
        })
        
        
        db.ref('/allposts/'+this.state.currPostId).once('value', (snapshot) =>{
                this.setState({
                    postName:snapshot.val().name,
                })
            });
            
        db.ref('/posts/'+this.state.currForum+'/'+this.state.currPostId+'/comments/').on('value', (snapshot) =>{
                let allComments=[];
                snapshot.forEach(snap => {
                        allComments.push({ 
                                content:snap.val().content,
                                uid:snap.val().uid,
                });
            });
            this.setState({ comments: allComments});
        });
        
    }    
   
    render(){
        return (
            <div>
                <h3>Post</h3>
                <ul>
                    {this.state.comments.map(comment => {
                        return (
                            <div>
                                <li key={comment.id}>
                                { `${comment.content} by `}
                                    <Link to={
                                        {pathname: `/profile/${comment.uid}`}
                                    }>
                                    {comment.uid}</Link>
                                </li>
                                <br/>
                            </div>
                        )
                    })}
                </ul>  
                <form onSubmit={this.handleComment}>
                    <label>Your comment</label>
                    <br/>
                    <textarea value={this.state.commentContent}
                                onChange={this.handleChangeComment}/>
                    <br/>
                    <input type="submit" value="Post"></input>   
                </form>   
            </div>
        )
    }
}