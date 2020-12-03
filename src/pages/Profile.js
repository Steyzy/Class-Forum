import React, { Component } from "react"
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { auth, db } from "../services/firebase.js"

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            major:"",
            nationality:"",
            year:"",
        }
    }

    // getinfo(){
    //     const uid = auth().currentUser.uid;
    //     name = db.ref('users/' + uid + '/profile/name').push();
    //     nationality = db.ref('users/' + uid + '/profile/nationality').push();
    //     year = db.ref('users/' + uid + '/profile/year').push();
    // }
    getname(){
        const uid = auth().currentUser.uid;
        db.ref('users/' + uid + '/profile/name').on('value',data =>{
            this.setState({name:data});
        })
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <Navbar loggedIn={true} />
                <p>name: {this.state.name}</p>
                <p>major: {this.state.major}</p>
                <p>nationality: {this.state.nationality}</p>
                <p>year: {this.state.year}</p>
                <Link to="/edit">Edit</Link>
            </div>
        )
    }
}