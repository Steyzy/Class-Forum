import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import { Link, Route, useLocation } from 'react-router-dom';
import Profile from "../../pages/Profile.js";
import "../../Styling/Forum.css"
export default class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currForum: this.props.currForum,
            allPosts: [],
            filteredPosts:[],
            postName:'',
            poster:'some',
            postContent: '',
            SearchInput: '',
            searchOption:0,
        }
        this.handlePost = this.handlePost.bind(this);
        this.handleChangePostContent = this.handleChangePostContent.bind(this);
        this.handleChangeSearchContent = this.handleChangeSearchContent.bind(this);
        this.handleChangePostName = this.handleChangePostName.bind(this);
        this.handleChangeSearchOption = this.handleChangeSearchOption.bind(this);
        this.handlePostSwitch =this.handlePostSwitch.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }
    
    handlePost(event) {    
        event.preventDefault();
        if(this.state.postName.trim() == '' || this.state.postContent.trim() == '')
        {
            alert("Name and content must be none-empty.")
            return
        }
        
        const uid = auth().currentUser.uid;
        const postId = db.ref('/posts/' + this.state.currForum).push().key;
        db.ref('/posts/' + this.state.currForum + '/' + postId).set({
            uid: uid,
            poster: this.state.poster,
            name : this.state.postName,
            content: this.state.postContent,
        });
        db.ref('allposts/' + postId).set({
            name: this.state.postName})
        const firstcommentId = db.ref('allposts/' + postId).push().key;
        db.ref('allposts/'+postId+'/'+firstcommentId).set({
            uid:uid,
            poster: this.state.poster,
            content:this.state.postContent,
        })
        alert("Successfully posted!")
        this.setState({ postName: '', postContent: '' })
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
    
    handleDel(event)
    {
        const uid = auth().currentUser.uid
        if(uid == event.target.name)
        {
            db.ref('allposts/'+event.target.id).remove()
            db.ref('/posts/'+this.state.currForum+'/'+event.target.id).remove()
            alert("Well, I guess sometimes humans just want to take back their words...")
            this.props.handlePostSwitch({name:''})
            return
        }
        alert("Sorry, You can't delete other's post.")
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
                
            case 3:
               filteredPosts = this.state.allPosts.filter( post =>{
                    return post.poster.toLowerCase().includes(event.target.value.toLowerCase())
                    })
                break;
                
            default:
               filteredPosts = this.state.allPosts;
        }
        this.setState({ filteredPosts:filteredPosts});
    }
    
    handlePostSwitch(event){
        this.props.handlePostSwitch({name: event.target.name});
    }
    
   componentDidMount()
    {
        const uid = auth().currentUser.uid;
        db.ref('/users/'+uid+'/profile').once('value', (snapshot) => {
          if(snapshot.val() != null){
                this.setState({ poster: snapshot.val().name })
          }
        });
        
        db.ref('posts/' + this.props.currForum).on('value', snapshot => {
            let allposts = [];
            snapshot.forEach(snap => {
                allposts.push({ name:snap.val().name,
                                content: snap.val().content, 
                                id: snap.key, 
                                uid: snap.val().uid,
                                poster:snap.val().poster});
            });
            this.setState({allPosts:allposts});
            this.setState({filteredPosts:allposts});
        });
    }
    
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ 
            currForum: props.currForum, 
            SearchInput:'',
            postName:'',
            postContent: '', // needed to clear the textarea after switching forum
        })
        
        const uid = auth().currentUser.uid;
        db.ref('/users/'+uid+'/profile').once('value', (snapshot) => {
          if(snapshot.val() != null){
                this.setState({ poster: snapshot.val().name })
          }
        });
        
        db.ref('posts/' + props.currForum).on('value', snapshot => {
            let allPosts = [];
            snapshot.forEach(snap => {
                allPosts.push({ name:snap.val().name,
                                content: snap.val().content, 
                                id: snap.key, 
                                uid: snap.val().uid,
                                poster:snap.val().poster});
            });
            this.setState({ allPosts: allPosts});
            this.setState({ filteredPosts: allPosts});
        })
    }

    render(){
        return (
            <div id="myPost" className='left' style={{backgroundColor: "papayawhip"}}>
                <button class="btn dropdown" data-toggle="collapse" data-target="#search">
                    <i class="icon-chevron-right"></i> Search for Post
                </button>
                <button class="btn dropdown" data-toggle="collapse" data-target="#write">
                    <i class="icon-chevron-right"></i> Write a Post
                </button>

                <div class="container" style={{textAlign: "center"}}>
                    <div class="collapse ml-5 mr-5 pl-5 pr-5" id="write" data-parent="#myPost">
                        <form onSubmit={this.handlePost}>
                            <div class="form-group">
                                <h5 for="title">Title</h5>
                                <input type="text" id="title" value = {this.state.postName} 
                                            onChange={this.handleChangePostName}  />
                            </div>
                            <div class="form-group">
                                <h5 for="content">Post Content</h5>
                                <textarea class="form-control" rows="5" id="content" value={this.state.postContent}
                                            onChange={this.handleChangePostContent}/>
                                <button type="submit" class="button">Post</button>   
                            </div>
                        </form>            
                    </div>

                    <div class="collapse" id="search" data-parent="#myPost">
                        <div class="form-group p-3">
                            <h5>Search for post</h5>
                            <select onChange={this.handleChangeSearchOption} style={{marginBottom: "15px"}}>
                                <option defaultValue="" disabled selected hidden>Select way of searching</option>
                                <option>Post Name</option>
                                <option>Content</option>
                                <option>User Name</option>
                            </select>                    
                            <h5 for="keyword">Type the keyword</h5>
                            <input id="keyword" value={this.state.SearchInput}
                                        onChange={this.handleChangeSearchContent}></input>
                        </div>
                    </div>

                    <div id="accordion" class="pb-3"  data-parent="#myPost">
                        {this.state.filteredPosts.map(post => {
                        return (
                        <div class="card">
                            <div class="card-header">
                            <div class="container">
                                <div class="row">
                                    <div class="col-8">
                                        <a class="card-link" data-toggle="collapse" href={"#post"+post.id} 
                                            key={post.id} style={{fontSize: "18px"}}>
                                            {post.name}
                                        </a>
                                    </div>
                                    <div class="col-4" style={{textAlign: "right"}}>
                                        { ` by `}
                                        <Link to={{pathname: `/profile/${post.uid}`}}>{post.poster}</Link>
                                        {"      "}
                                        <div class="btn-group">
                                            {post.uid === auth().currentUser.uid &&
                                                <button type="button" class="btn btn-secondary" 
                                                        href="#" name={post.uid} id={post.id}onClick={this.handleDel}>
                                                    Delete
                                                </button>
                                            }
                                            <button type="button" class="btn btn-primary" 
                                                    href="#" name={post.id} onClick={this.handlePostSwitch}>
                                                View
                                            </button>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            </div>
                            <div id={"post"+post.id} class="collapse" data-parent="#accordion">
                                <div class="card-body" style={{textAlign: "left"}}>
                                    {post.content}
                                </div>
                            </div>
                        </div>
                        )})} 
                    </div>
                </div>
            </div>   
        )
    }
}