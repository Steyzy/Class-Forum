import React, { Component } from "react"
import { Link } from "react-router-dom"
import { signin } from "../helpers/auth"
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center; 
  background: #d9f2ff;
  padding: 0.5em;
  margin: 0;
  color: deepgrey;
`
const Wrapper = styled.section`
  padding-top: 0.5em;
  padding-bottom: 1em;
  background: papayawhip;
  text-align: center;
  margin: 0;
`
const Words = styled.p`
  text-align: center;
  font-size: 1em;
  text-decoration: none;
`
const Typein = styled.input`
  padding: 0.5em;
  text-align: left-aligned;
  font-size: 1em;
  margin: 0.25em
`
const Button = styled.button`
  background: white;
  color: palevioletred;
  font-size: 1.1em;
  margin-top: 1em;
  margin-bottom: 2em;
  padding: 0.5em 1.25em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  text-decoration: none;
`

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    // The following binding is needed to avoid weird bugs.
    // This might be outdated, feel free to delete it if you are sure it is.
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({      
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Title>
            Login to <Words as='a' href="/" font-size='2.5em'>Forum</Words>
          </Title>
          <Wrapper>
          <Words>
            Fill in the form below to login to your account.
          </Words>
          <div>
            <Typein
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <Typein
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            {this.state.error ? (
              <p>{this.state.error}</p>
            ) : null}
            <Button type="submit">Login</Button>
          </div>
          <Words>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Words>
          </Wrapper>
        </form>

      </div>
    );
  }
}
