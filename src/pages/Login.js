import React, { Component } from "react"
import { Link } from "react-router-dom"
import { signin } from "../helpers/auth"
import '../Styling/Home.css'

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
          <h1>
            Login to <Link to="/">Forum</Link>
          </h1>
          <section className='smallPadding'>
          <p className='smallMargin'>
            Fill in the form below to login to your account.
          </p>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            {this.state.error ? (
              <p className=''>{this.state.error}</p>
            ) : null}
            <button type="submit" className="button">Login</button>
          </div>
          <p className='smallMargin'>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          </section>
        </form>
      </div>
    );
  }
}
