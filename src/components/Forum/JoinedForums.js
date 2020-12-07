import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"
import '../../Styling/Forum.css'

export default class JoinedForums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forums: [],
            selectedName: 0,
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
                <h2>View a Forum</h2>
                <p>Choose a forums that you have joined</p><br/>
                <form>
                    <select onChange={this.props.onChange}>
                        <option defaultValue="" disabled selected hidden>Choose a forum to view</option>
                        {this.state.forums.map(forum => {
                            return (
                                <option key={forum.id} my_key={forum.name}>
                                    {forum.name}
                                </option>
                            )
                        })}                        
                    </select>
                </form>
            </div>
        )
    }
}