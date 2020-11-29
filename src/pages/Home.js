import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Forum</h1>
        <Navbar loggedIn={false} />
        <p>Find your classmates here!</p>
      </div>
    )
  }
}
