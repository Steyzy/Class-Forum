import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2.75em;
  text-align: center; 
  background: #d9f2ff;
  padding: 0.5em;
  margin: 0;
  color: deepgrey;
`
const Wrapper = styled.section`
  padding-top: 6em;
  padding-bottom: 1em;
  background: papayawhip;
  text-align: center;
  margin: 0;
`

const Words = styled.p`
  text-align: center;
  font-size: 1.1em;
  margin-top: 5em;
`
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Title>Welcome to Forum</Title>
        <Wrapper>
        <Navbar loggedIn={false} />
        <Words>Find your classmates here!</Words>
        </Wrapper>
      </div>
    )
  }
}
