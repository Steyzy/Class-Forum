import React, { Component } from "react"
import { logout } from "../helpers/auth"

export default class Forum extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
    }
  }

  render() {
    return (
      <div>
        <h1>Forum</h1>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  }
}
