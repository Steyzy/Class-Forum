import React, { Component } from "react"
import { Link } from 'react-router-dom';
import { logout } from "../helpers/auth"

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
        }
    }

    render() {
        return (
            <div class="navbar">
                {this.state.loggedIn ? 
                <div>
                    <Link to="/forum">Forum</Link> <br/>                 
                    <Link to="/profile">Profile</Link> <br/>                 
                    <button onClick={logout}>Log Out</button>
                </div> 
                : 
                <div>
                    <Link to="/">Home</Link> <br/>
                    <Link to="/signup">Sign Up</Link> <br/>               
                    <Link to="/login">Login</Link>
                </div>
                }

            </div>
        )
    }
}