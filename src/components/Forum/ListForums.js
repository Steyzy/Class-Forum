import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class ListForums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forums: [],
        }
    }
    componentDidMount() {
        db.ref('forums/').on("value", snapshot => {
            let forums = [];
            snapshot.forEach(snap => {
                forums.push({name: snap.val().name, id: snap.key});
            });
            this.setState({ forums: forums});
        })

    }
    getForums() {
    }
    render() {
        return (
            <form>
                <select>
                <option value="" disabled selected hidden>Select a forum to join</option>
                    {this.state.forums.map(forum => {
                        return (
                            <option key={forum.id}>
                                {forum.name}
                            </option>
                        )
                    })}
                </select>
                <input type="submit" />
            </form>
        )
    }
}