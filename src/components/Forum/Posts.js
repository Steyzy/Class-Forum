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
            postName:'',
            postContent: '',
            SearchInput: '',
            searchOption:0,
        }
        this.handlePost = this.handlePost.bind(this);
        this.handleChangePostContent = this.handleChangePostContent.bind(this);
        this.handleChangeSearchContent = this.handleChangeSearchContent.bind(this);
        this.handleChangePostName = this.handleChangePostName.bind(this);
        this.handleChangeSearchOption = this.handleChangeSearchOption.bind(this);
    }
    
    handlePost(event) {    
        if(this.state.postName.trim() == '' || this.state.postContent.trim() == '')
        {
            alert("Name and content must be none-empty.")
            return
        }
        
        const uid = auth().currentUser.uid;
        const postId = db.ref('/posts/' + this.state.currForum).push().key;
        db.ref('/posts/' + this.state.currForum + '/' + postId).set({
            uid: uid,
            name : this.state.postName,
            content: this.state.postContent,
            comments: [],
        });
        db.ref('users/' + uid + '/posts/' + postId).set({
            value: true})   // The value is just to keep the node there. There's 
                            // no specific reason to sue boolean value
        alert("Successfully posted!")
    }
    
    handleChangeSearchOption(event)
    {
        switch (event.target.value)
        {
            case 'Post Name':
                this.setState({searchOption: 1})
                return;
            case 'Content':
                this.setState({searchOption: 2})
                return;
            case 'User Name':
                this.setState({searchOption: 3})
                return;
            default:
                return;
        }
    }
    
    handleChangePostContent (event) {
        this.setState({ postContent: event.target.value })
    }    
    
    handleChangePostName (event) {
        this.setState({ postName: event.target.value})
    } 
    
    handleChangeSearchContent (event) {
        this.setState({ SearchInput: event.target.value })
        let filteredPosts = [];
        switch (this.state.searchOption)
        {
            case 1:
              filteredPosts = this.state.allPosts.filter( post =>{
                    return post.name.toLowerCase().includes(event.target.value.toLowerCase())
                    })
                break;
            case 2:
               filteredPosts = this.state.allPosts.filter( post =>{
                    return post.content.toLowerCase().includes(event.target.value.toLowerCase())
                    })
                break;
                
                // this is where to add enable name search case 3
                
                
            default:
               filteredPosts = this.state.allPosts;
        }
        this.setState({ filteredPosts:filteredPosts});
    }
    
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ 
            currForum: props.currForum, 
            SearchInput:'',
            postName:'',
            postContent: '', // needed to clear the textarea after switching forum
        })
        db.ref('posts/' + this.state.currForum).on('value', snapshot => {
            let allPosts = [];
            snapshot.forEach(snap => {
                allPosts.push({ name:snap.val().name,
                                content: snap.val().content, 
                                id: snap.key, uid: 
                                snap.val().uid});
            });
            this.setState({ allPosts: allPosts});
            this.setState({ filteredPosts: allPosts});
        })
    }    
    render(){
        return (
            <div>
                <h3>Posts</h3>
                <label>Search for post</label>
                <br/>
                <select onChange={this.handleChangeSearchOption}>
                    <option defaultValue="" disabled selected hidden>Select way of searching</option>
					<option>Post Name</option>
					<option>Content</option>
					<option>User Name</option>
                </select>
                <br/>
                <textarea value={this.state.SearchInput}
                                onChange={this.handleChangeSearchContent}/><br/>
                <ul>
                    {this.state.filteredPosts.map(post => {
                        const trial = "profile"
                        return (
                            <div>
                                <li key={post.id}>
                                <a href="#" onClick={this.props.onClick}>
                                        {post.name}
                                </a>  
                                { ` by `}
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
                                <li> {post.content}</li>
                                <br/>
                            </div>
                        )
                    })}
                </ul>
                <form onSubmit={this.handlePost}>
                    <label>Post something</label><br/>
                    <label>Post Name</label><br/>
                    <textarea value = {this.state.postName} 
                               onChange={this.handleChangePostName}  />
                    <br/>
                    <label>Post Content</label><br/>
                    <textarea value={this.state.postContent}
                                onChange={this.handleChangePostContent}
                    /><br/>
                    <input type="submit" value="Post"></input>   
                </form>            
            </div>
        )
    }
}