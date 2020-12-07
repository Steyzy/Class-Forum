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
            redirect: false
        }
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
        

    
    componentDidMount() {
        db.ref(`/users/${ this.state.uid }/profile/`).on('value', snapshot => {
            if (snapshot.val() !== null){
                //console.log(snapshot.val())
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
        //console.log(this.state)
        db.ref('/users/' + uid + '/profile/').update({ 
            name: this.state.name,
            major: this.state.major,
            nationality: this.state.nationality,
            year: this.state.year
        });
        alert("Successfully saved profile change!")
        this.setState({
            redirect: true
        })
        //{this.renderRedirect()}
        //return



    }
    

    handleChange(event, Attribute) {
        this.setState({ 
            [Attribute]: event.target.value 
        })
        //{console.log(this.state.name)}
        //{console.log(this.state.major)}

    }    
    
    /*
    renderRedirect(){
        console.log('renderRedirect reached')
        if (this.state.redirect) {
            return <Redirect to='/profile' />
          }
    }
    */

    render() {
        return (
            <div>
                <h1>Edit Profile</h1>
                <Navbar loggedIn={true} />
                <div>
                    <form onSubmit={this.handleProfileChange}>
                        <div>
                            <label>Change name: </label>
                            <textarea value={this.state.name}
                                        onChange={(event)=>{this.handleChange(event,'name')}}
                            /><br/>
                        </div>
                        <div>
                            <label>Change major: </label>
                            <textarea value={this.state.major}
                                        onChange={(event) => {this.handleChange(event,'major')}}
                            /><br/>
                        </div>
                        <div>
                            <label>Change year: </label>
                            <textarea value={this.state.year}
                                        onChange={(event) => {this.handleChange(event,'year')}}
                            /><br/>
                        </div>
                        <div>
                            <label>Change nationality: </label>
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