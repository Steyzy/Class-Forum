import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class JoinedForums extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>Your forums</p>
            </div>
        )
    }
}