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
            poster:'someone',
            commentContent: '',
        }
        this.handleComment = this.handleComment.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleDel = this.handleDel.bind(this);
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
            poster: this.state.poster,
        });
        alert("Successfully commented!")
    }
    
    handleDel(event)
    {
        const uid = auth().currentUser.uid
        if(uid == event.target.name)
        {
            db.ref('/allposts/'+this.state.currPostId+'/'+event.target.id).remove()
            alert("Well, I guess sometimes humans just want to take back their words...")
            return
        }
        alert("Sorry, You can't delete other's post.")
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
        const uid = auth().currentUser.uid;
        db.ref('/users/'+uid+'/profile').once('value', (snapshot) => {
          if(snapshot.val() != null){
                this.setState({ poster: snapshot.val().name })
          }
        });
        
        db.ref('/allposts/'+this.state.currPostId).once('value', (snapshot) =>{
                this.setState({
                    postName:snapshot.val().name,
                })
            });
  
        db.ref('/allposts/'+this.state.currPostId).on('value', snapshot =>{
            let allComments = [];
            snapshot.forEach(snap => {
                allComments.push({
                                id:snap.key,
                                content: snap.val().content,
                                uid:snap.val().uid,
                                poster:snap.val().poster});
            });
            this.setState({ comments: allComments.slice(1,allComments.length-1),
                            postContent: allComments[0].content
            });
        })
            
        
    }    
   
    render(){
        return (
            <div>
                <div class="jumbotron">{this.state.postContent}</div>
                
                <ul>
                    {this.state.comments.map(comment => {
                        return (
                            <div>
                                <li key={comment.id}>
                                { `${comment.content} by `}
                                    <Link to={
                                        {pathname: `/profile/${comment.uid}`}
                                    }>
                                    {comment.poster}</Link>
                                    {"      "}
                                <a href="#" name={comment.uid} id={comment.id} onClick={this.handleDel}>
                                        {"⨉"}
                                </a> 
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