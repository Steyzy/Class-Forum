import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from "../helpers/auth";
import '../Styling/Home.css'


export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    // the following two lines are absolutely necessary to prevent crashing
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // update the values in the state as the user types input
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to <Link to="/">Forum</Link>
          </h1>
          <section className='smallPadding'>
          <p className='smallMargin'>Fill in the form below to create an account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" 
              onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div>
            <input placeholder="Password" name="password" 
              onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit" className='button'>Sign up</button>
          </div>
          <p className='smallMargin'>Already have an account? <Link to="/login">Login</Link></p>
          </section>
        </form>
      </div>
      /*<div>
        <form onSubmit={this.handleSubmit}>
          <Title>
            Sign Up to <Words as='a' href="/" font-size='2.5em'>Forum</Words>
          </Title>
          <Wrapper>
          <Words>Fill in the form below to create an account.</Words>
          <div>
            <Typein placeholder="Email" name="email" type="email" 
              onChange={this.handleChange} value={this.state.email}></Typein>
          </div>
          <div>
            <Typein placeholder="Password" name="password" 
              onChange={this.handleChange} value={this.state.password} type="password"></Typein>
          </div>
          <div>
            {this.state.error ? <Words>{this.state.error}</Words> : null}
            <Button type="submit">Sign up</Button>
          </div>
          <Words>Already have an account? <Link to="/login">Login</Link></Words>
          </Wrapper>
        </form>
      </div>*/
    )
  }
}
