import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import { Link, Route, useLocation } from 'react-router-dom';
import Profile from "../../pages/Profile.js";


export default class Posts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currForum: this.props.currForum,
            allPosts: [],
            filteredPosts:[],
            postContent: '',
            SearchInput: '',
        }
        this.handlePost = this.handlePost.bind(this);
        this.handleChangePostContect = this.handleChangePostContect.bind(this);
        this.handleChangeSearchContect = this.handleChangeSearchContect.bind(this);
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
    handleChangePostContect (event) {
        this.setState({ postContent: event.target.value })
    }    
    
    handleChangeSearchContect (event) {
        this.setState({ SearchInput: event.target.value })
        const fPosts = this.state.allPosts.filter( post =>{
            return post.content.toLowerCase().includes(event.target.value.toLowerCase())
        })
        this.setState({ filteredPosts:fPosts});
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
                allPosts.push({content: snap.val().content, id: snap.key, uid: snap.val().uid});
            });
            this.setState({ allPosts: allPosts});
            this.setState({ filteredPosts: allPosts});
        })
    }    
    render(){
        return (
            <div>
                <h3>Posts</h3>
                <label>Search for post content</label><br/>
                    <textarea value={this.state.SearchInput}
                                onChange={this.handleChangeSearchContect}
                    /><br/>
                <ul>
                    {this.state.filteredPosts.map(post => {
                        const trial = "profile"
                        return (
                            <div>
                                <li key={post.id}>{`${post.content} by `}
                                    <Link to={
                                        {
                                            pathname: '/profile',
                                            state: {
                                                uid: post.uid
                                            }
                                        }
                                    }>
                                    {post.uid}</Link>
                                </li>
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