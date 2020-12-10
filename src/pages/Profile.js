import React, { Component, createElement } from "react"
import ForumNav from '../components/Forum/ForumNav';
import { Link } from 'react-router-dom';
import { auth, db } from "../services/firebase.js"
import "../Styling/Home.css"

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: (props.match.params.uid === undefined)? auth().currentUser.uid : props.match.params.uid,
            name:"",
            major:"",
            nationality:"",
            email:"",
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
                    email: snapshot.val().email,
                    nationality: snapshot.val().nationality
                })
            }
        })
    
    }

    render() {
    	if(this.state.uid === auth().currentUser.uid){
    		return (
            <div>
                <ForumNav />    
                <h3>User Profile</h3>
                <section className="profile">
                <div class="grid-container mx-auto pb-4" style={{width: "40%"}}>
                    <p className="profile"><strong>Name: </strong>{this.state.name} </p>
                    <p className="profile"><strong>Email Address: </strong>{this.state.email} </p>
                    <p className="profile"><strong>Major: </strong>{this.state.major} </p>
                    <p className="profile"><strong>Year of Graduation: </strong>{this.state.year} </p>
                    <p className="profile"><strong>Nationality: </strong>{this.state.nationality} </p>                   
                </div>
                <a href="/edit" class="button">Edit Profile</a>
                </section>
            </div>
        )
    	}
    	else {
    		return (
            <div>
                <ForumNav />    
                <h3>User Profile</h3>
                <section style={{paddingTop: "2em"}}>
                <div class="grid-container w-25 mx-auto pb-4">
                    <p className="profile"><strong>Name: </strong>{this.state.name} </p>
                    <p className="profile"><strong>Email Address: </strong>{this.state.email} </p>
                    <p className="profile"><strong>Major: </strong>{this.state.major} </p>
                    <p className="profile"><strong>Year of Graduation: </strong>{this.state.year} </p>
                    <p className="profile"><strong>Nationality: </strong>{this.state.nationality} </p>
                </div>
                </section>
            </div>
        )
    	}
    }
}
