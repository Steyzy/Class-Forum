import React, { Component } from "react"
import Navbar from '../components/Navbar';
import ChangeName from "../components/Profile/ChangeName";
import ChangeNationality from "../components/Profile/ChangeNationality";
import ChangeYear from "../components/Profile/ChangeYear";
import ChangeMajor from "../components/Profile/ChangeMajor";
import { Link, Redirect } from 'react-router-dom';
import { auth, db } from "../services/firebase.js"


export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            uid: auth().currentUser.uid,
            name: '',
            major:"",
            nationality:"",
            year:"",
        }
        //this.handleProfileChange = this.handleProfileChange.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }
        

    
    componentDidMount() {
        db.ref(`/users/${ this.state.uid }/profile/`).on('value', snapshot => {
            if (snapshot.val() !== null){
                console.log(snapshot.val().name)
                this.setState({
                    name: snapshot.val().name,
                    major: snapshot.val().major,
                    year: snapshot.val().year,
                    nationality: snapshot.val().nationality
                })
            }
        })
    }

    /*
    handleProfileChange(event) {        
        event.preventDefault();
        const uid = auth().currentUser.uid;
        if (this.state.name == ''){
            alert("Name must be none-empty.")
            return
        }
        db.ref('/users/' + uid + '/profile/').update({ 
            name: this.state.name,
        });

        alert("Successfully changed name!")
    }

    handleChange(event) {
        const uid = auth().currentUser.uid;
        console.log("handling change")
        this.setState({ name: event.target.value })
        {console.log(this.state.name)}

    }    
    */

    render() {
        return (
            <div>
                <h1>Edit Profile</h1>
                <Navbar loggedIn={true} />
                <div>
                    <ChangeName infoContent={this.state.name} />
                    <ChangeMajor infoContent={this.state.major}/>
                    <ChangeNationality infoContent={this.state.nationality} />
                    <ChangeYear infoContent={this.state.year} />
                    <Link to='/profile'>Done</Link>
                </div>
            </div>
            )
    }
}