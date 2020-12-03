import React, { Component } from "react"
import { Link } from 'react-router-dom';
import { logout } from "../helpers/auth"
import styled from 'styled-components';

const Button = styled.button`
  background: white;
  color: palevioletred;
  font-size: 1.1em;
  margin: 1.5em;
  padding: 0.5em 1.25em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  text-decoration: none;
`

const Wrapper = styled.section`
  padding: 5em;
  background: papayawhip;
  text-align: center;
  margin: 0;
`

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
                    <Wrapper>
                        <Button as="a" href="/forum">Forum</Button>
                        <Button >Profile</Button>
                        <Button onClick={logout}>Log Out</Button>
                        {/*<Link to="/forum">Forum</Link> <br/>             
                        <Link to="/profile">Profile</Link> <br/>                 
                        <button onClick={logout}>Log Out</button>*/}
                    </Wrapper> 
                 : 
                    <Wrapper>
                        <Button as="a" href="/">Home</Button>
                        <Button as="a" href="/signup">Sign Up</Button>
                        <Button as="a" href="/login">Login</Button>
                        {/*<Link to="/">Home</Link> <br/>
                        <Link to="/signup">Sign Up</Link> <br/>               
                        <Link to="/login">Login</Link>*/}
                    </Wrapper>
                }
            </div>
        )
    }
}