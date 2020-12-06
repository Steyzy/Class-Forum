import React, { Component } from "react"
import { Link } from 'react-router-dom';
import { logout } from "../helpers/auth"
import '../Styling/Home.css'

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
        }
    }

    render() {
        return (
            <div className="navbar">
                {this.state.loggedIn ? 
                    <div>
                        <a href="/forum" className='button'>Forum</a>
                        <a href="/profile" className='button'>Profile</a>
                        <a onClick={logout} className='button'>Log Out</a>
                    </div> 
                 : 
                    <div>
                        <a href="/" className='button'>Home</a>
                        <a href="/signup" className='button'>Sign Up</a>
                        <a href="/login" className='button'>Login</a>
                    </div>
                }
            </div>
        )
    }
}