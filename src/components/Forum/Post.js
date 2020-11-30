import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class Post extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <h5>Posts</h5>
        )
    }
}