import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class JoinedForums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forums: [],
        }
    }
    componentDidMount() {
        db.ref('users/' + auth().currentUser.uid + '/forums').on('value', snapshot => {
            let forums = [];
            snapshot.forEach(snap => {
                forums.push({name: snap.val().key, id: snap.key});
            });
            this.setState({ forums: forums});
        })
    }
    render() {        
        return (
            <div>
                <h2>Your Forums</h2>
                <label>Click a forum to view posts there</label><br/>
                <ul>
                    {this.state.forums.map(forum => {
                        return (
                            <div>
                                <li key={forum.id}>
                                    <a href="#" onClick={this.props.onClick}>
                                        {forum.name}
                                    </a>    
                                </li>
                                <br/>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}