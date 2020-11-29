import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class CurrentForum extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h4>Current Forum</h4>
            </div>
        )
    }
}