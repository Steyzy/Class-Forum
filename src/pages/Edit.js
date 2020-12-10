import React, { Component } from "react"
import ForumNav from '../components/Forum/ForumNav';
//import ChangeName from "../components/Profile/ChangeName";
//import ChangeNationality from "../components/Profile/ChangeNationality";
//import ChangeYear from "../components/Profile/ChangeYear";
//import ChangeMajor from "../components/Profile/ChangeMajor";
import { Link, Redirect } from 'react-router-dom';
import { auth, db } from "../services/firebase.js"
import "../Styling/Home.css"


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
        return (
            <div>
            <ForumNav />
                <h3>Edit Profile</h3>
                <div class="grid-container w-25 mx-auto pt-3">
                    <form onSubmit={this.handleProfileChange}>
                        <div class="form-group">
                            <p for="edname" class="edit">Edit Name: </p>
                            <input type="text" class="form-control" value={this.state.name} id="edname"
                                        onChange={(event)=>{this.handleChange(event,'name')}}/>
                        </div>
                        <div class="form-group">
                            <p for="edmajor" class="edit">Edit Major: </p>
                            <input type="text" class="form-control" id="edmajor" value={this.state.major}
                                        onChange={(event) => {this.handleChange(event,'major')}}
                            />
                        </div>
                        <div class="form-group">
                            <p for="edyear" class="edit">Edit Year of Graduation: </p>
                            <input type="text" class="form-control" id="edyear" value={this.state.year}
                                        onChange={(event) => {this.handleChange(event,'year')}}
                            />
                        </div>
                        <div class="form-group">
                            <p for="ednation" class="edit">Edit Nationality: </p>
                            <input type="text" class="form-control" id="ednation" value={this.state.nationality}
                                        onChange={(event) => {this.handleChange(event,'nationality')}}
                            />
                        </div>
                        <button type="submit" class="button">Finish</button>
                    </form>
                    { this.state.redirect ? (<Redirect push to="/profile"/>) : null }
                </div>
            </div>
            )
        
    }
}
