import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4">Welcome to Forum</h1>
        <p>Find your classmates here!</p>
        <Link to="/signup">Sign Up</Link>
        <br />
        <Link to="/login">Login</Link>
      </div>
    )
  }
}
