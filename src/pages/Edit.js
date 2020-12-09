import React, { Component } from "react"
import ForumNav from '../components/Forum/ForumNav';
//import ChangeName from "../components/Profile/ChangeName";
//import ChangeNationality from "../components/Profile/ChangeNationality";
//import ChangeYear from "../components/Profile/ChangeYear";
//import ChangeMajor from "../components/Profile/ChangeMajor";
import { Link, Redirect } from 'react-router-dom';
import { auth, db } from "../services/firebase.js"


export default class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            uid: auth().currentUser.uid,
            name: '',
            major:"",
            nationality:"",
            year:"",
            redirect: false
        }
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
        

    
    componentDidMount() {
        db.ref(`/users/${ this.state.uid }/profile/`).on('value', snapshot => {
            if (snapshot.val() !== null){
                this.setState({
                    name: snapshot.val().name,
                    major: snapshot.val().major,
                    year: snapshot.val().year,
                    nationality: snapshot.val().nationality
                })
            }
        })
    }

    
    handleProfileChange(event) {        
        event.preventDefault();
        const uid = auth().currentUser.uid;
        if (this.state.name == ''){
            alert("Name must be none-empty.")
            return
        }
        db.ref('/users/' + uid + '/profile/').update({ 
            name: this.state.name,
            major: this.state.major,
            nationality: this.state.nationality,
            year: this.state.year,
            email: auth().currentUser.email
        });
        alert("Successfully saved profile change!")
        this.setState({
            redirect: true
        })
    }
    

    handleChange(event, Attribute) {
        this.setState({ 
            [Attribute]: event.target.value 
        })
    }    
    

    render() {
        if (this.state.name == ""){
            return (
                <div>
                <ForumNav />
                    <h1>Edit Profile</h1>
                    <div>
                        <form onSubmit={this.handleProfileChange}>
                            <div>
                                <label>Please Enter Name: </label>
                                <textarea value={this.state.name}
                                            onChange={(event)=>{this.handleChange(event,'name')}}
                                /><br/>
                            </div>
                            <div>
                                <label>Please Enter Major: </label>
                                <textarea value={this.state.major}
                                            onChange={(event) => {this.handleChange(event,'major')}}
                                /><br/>
                            </div>
                            <div>
                                <label>Please Enter Year of Graduation: </label>
                                <textarea value={this.state.year}
                                            onChange={(event) => {this.handleChange(event,'year')}}
                                /><br/>
                            </div>
                            <div>
                                <label>Please Enter Nationality: </label>
                                <textarea value={this.state.nationality}
                                            onChange={(event) => {this.handleChange(event,'nationality')}}
                                /><br/>
                            </div>
                            <input type="submit" value="Finish"></input>
                        </form>
                        { this.state.redirect ? (<Redirect push to="/profile"/>) : null }
                    </div>
                </div>
                )

        }
        else{
            return (
                <div>
                <ForumNav />
                    <h1>Edit Profile</h1>
                    <div>
                        <form onSubmit={this.handleProfileChange}>
                            <div>
                                <label>Edit Name: </label>
                                <textarea value={this.state.name}
                                            onChange={(event)=>{this.handleChange(event,'name')}}
                                /><br/>
                            </div>
                            <div>
                                <label>Edit Major: </label>
                                <textarea value={this.state.major}
                                            onChange={(event) => {this.handleChange(event,'major')}}
                                /><br/>
                            </div>
                            <div>
                                <label>Edit Year of Graduation: </label>
                                <textarea value={this.state.year}
                                            onChange={(event) => {this.handleChange(event,'year')}}
                                /><br/>
                            </div>
                            <div>
                                <label>Edit Nationality: </label>
                                <textarea value={this.state.nationality}
                                            onChange={(event) => {this.handleChange(event,'nationality')}}
                                /><br/>
                            </div>
                            <input type="submit" value="Finish"></input>
                        </form>
                        { this.state.redirect ? (<Redirect push to="/profile"/>) : null }
                    </div>
                </div>
                )
        }
    }
}
