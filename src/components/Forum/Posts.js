import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currForum: this.props.currForum,
            allPosts: [],
            postContent: '',
        }
        this.handlePost = this.handlePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handlePost(event) {        
        console.log(this.state.currForum)
        const uid = auth().currentUser.uid;
        const postId = db.ref('/posts/' + this.state.currForum).push().key;
        db.ref('/posts/' + this.state.currForum + '/' + postId).set({
            uid: uid,
            content: this.state.postContent,
        });
        db.ref('users/' + uid + '/posts/' + postId).set({
            value: true})   // The value is just to keep the node there. There's 
                            // no specific reason to sue boolean value
        alert("Successfully posted!")
    }
    handleChange(event) {
        this.setState({ postContent: event.target.value })
    }    
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ 
            currForum: props.currForum, 
            postContent: '', // needed to clear the textarea after switching forum
        })
        db.ref('posts/' + this.state.currForum).on('value', snapshot => {
            let allPosts = [];
            snapshot.forEach(snap => {
                allPosts.push({content: snap.val().content, id: snap.key});
            });
            this.setState({ allPosts: allPosts});
        })
    }    
    render(){
        return (
            <div>
                <h3>Posts</h3>
                <ul>
                    {this.state.allPosts.map(post => {
                        return (
                            <div>
                                <li key={post.id}>{post.content}</li>
                                <br/>
                            </div>
                        )
                    })}
                </ul>
                <form onSubmit={this.handlePost}>
                    <label>Post something</label><br/>
                    <textarea value={this.state.postContent}
                                onChange={this.handleChange}
                    /><br/>
                    <input type="submit" value="Post"></input>   
                </form>            
            </div>
        )
    }
}