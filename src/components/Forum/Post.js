import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import { Link, Route, useLocation } from 'react-router-dom';
import Profile from "../../pages/Profile.js";
import "../../Styling/Forum.css"

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
 
 componentDidMount()
 {
   this.setState({ 
            currPostId: this.props.currPostId, 
            commentContent: '', // needed to clear the textarea after switching forum
        })
    const uid = auth().currentUser.uid;
        db.ref('/users/'+uid+'/profile').once('value', (snapshot) => {
          if(snapshot.val() != null){
                this.setState({ poster: snapshot.val().name })
          }
        });
        db.ref('/users/'+uid+'/profile').once('value', (snapshot) => {
          if(snapshot.val() != null){
                this.setState({ poster: snapshot.val().name })
          }
        });
        
        db.ref('/allposts/'+this.props.currPostId).once('value', (snapshot) =>{
                this.setState({
                    postName:snapshot.val().name,
                })
            });
  
        db.ref('/allposts/'+this.props.currPostId).once('value', snapshot =>{
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
 
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ 
            currPostId: this.props.currPostId, 
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
                <div class="jumbotron w-50 mx-auto bg-white" style={{textAlign: "left"}}>
                    {this.state.postContent}
                </div>
                
                <div id="thePost" style={{backgroundColor: "rgb(229,229,255)"}}>
                    <div style={{textAlign: "left"}}>
                    <button class="btn dropdown mb-3" data-toggle="collapse" data-target="#read">
                        <i class="icon-chevron-right"></i> Read the Comments
                    </button>
                    <button class="btn dropdown mb-3" data-toggle="collapse" data-target="#writecomment">
                        <i class="icon-chevron-right"></i> Write a Comment
                    </button>
                    </div>
                    <div class="collapse" id="read"  data-parent="#thePost">
                        <div id="accordion" class="pb-3 mx-auto w-75">
                            {this.state.comments.map(comment => {
                                return (
                                    <div class="card">
                                        <div class="card-header">
                                        <a class="card-link" key={comment.id} data-toggle="collapse" href="#oneComment">
                                            A comment by <Link to={{pathname: `/profile/${comment.uid}`}}>
                                            {comment.poster}
                                            </Link>
                                        </a>
                                        {"      "}
                                        <button type="button" class="btn btn-secondary" 
                                                href="#" name={comment.uid} id={comment.id} onClick={this.handleDel}>
                                            Delete
                                        </button>
                                        </div>
                                        <div id="oneComment" class="collapse" data-parent="#accordion">
                                        <div class="card-body">
                                            {comment.content}
                                        </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div class="collapse" id="writecomment"  data-parent="#thePost">
                        <form onSubmit={this.handleComment}>
                            <div class="form-group">
                                <h5 for="mycomments">Your comment</h5>
                                <textarea class="form-control w-50 mx-auto mt-3" rows="3" id="mycomments" value={this.state.commentContent}
                                            onChange={this.handleChangeComment}/>
                                <br/>
                                <button type="submit" class="button mt-0">Post</button>  
                            </div>
                        </form> 
                    </div>
                </div>

                  
            </div>
        )
    }
}