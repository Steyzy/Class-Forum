import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import Posts from './Posts';


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
                <h2>Current Forum: {this.state.currForum}</h2>
                {this.state.currForum == '' ?
                    <p>Choose a forum to view</p>
                    :
                    <Posts currForum={this.state.currForum}/>                    
                }
            </div>
        )
    }
}