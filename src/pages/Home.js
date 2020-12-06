import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import '../Styling/Home.css'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Forum</h1>
        <section>
        <Navbar loggedIn={false} />
        <p>Find your classmates here!</p>
        </section>       
      </div>
    )
  }
}