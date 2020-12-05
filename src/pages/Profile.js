import React, { Component, createElement } from "react"
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { auth, db } from "../services/firebase.js"

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: (props.match.params.uid === undefined)? auth().currentUser.uid : props.match.params.uid,
            name:"",
            major:"",
            nationality:"",
            year:"",
        }
        console.log(this.state.uid)
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

    render() {
        return (
            <div>
                <Navbar loggedIn={true} />    
                <h1>User Profile</h1>
                <p>Name: {this.state.name} </p>
                <p>Major: {this.state.major} </p>
                <p>Year: {this.state.year} </p>
                <p>Nationality: {this.state.nationality} </p>
                <Link to="/edit">Edit Profile</Link>
            </div>
        )
    }
}