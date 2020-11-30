import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import Post from './Post';


export default class CurrentForum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currForum: this.props.currForum,
        }
    }
    // function name identified by React, do not change
    componentWillReceiveProps(props) {
        this.setState({ currForum: props.currForum })
    }
    render() {
        return (
            <div>
                <h4>Current Forum: {this.state.currForum}</h4>
                <Post/>
            </div>
        )
    }
}