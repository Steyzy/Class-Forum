import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3em;
  text-align: center; 
  background: #d9f2ff;
  padding: 1em;
  margin: 0;
  color: deepgrey;
`
const Words = styled.p`
  text-align: center;
  font-size: 1.1em;
`
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Title>Welcome to Forum</Title>
        <Navbar loggedIn={false} />
        <Words>Find your classmates here!</Words>
      </div>
    )
  }
}
