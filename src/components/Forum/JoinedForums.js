import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class JoinedForums extends Component {
    constructor(props) {
        super(props);
        let val = db.ref('users/' + auth().currentUser.uid + '/forums').on('value', (snapshot) => {
            snapshot.forEach(snap => {
                console.log(snap.val());
            })
        })
    }
    render() {
        
        return (
            <div>
                <p>Your forums</p>
            </div>
        )
    }
}