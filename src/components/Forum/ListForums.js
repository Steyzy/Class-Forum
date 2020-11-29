import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class ListForums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forums: [],
            selectedId: 0,
        }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
    // React does not allow me to extract key, so I have to extract my_key
    // to identify the forum chosen
    handleChange(event) {
        const index = event.target.options.selectedIndex;
        const id = event.target.options[index].getAttribute('my_key');
        this.setState({selectedId: id});
    }    
    handleSubmit(event) {
        event.preventDefault(); // this is needed to make it work
        db.ref('/users/' + auth().currentUser.uid + '/forums/' + this.state.selectedId).update({
          key: this.state.selectedId,
        });        
        alert("Success!");
    }
    render() {
        return (
            <div>
                <h4>Join A Forum</h4>
                <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange}>
                    <option defaultValue="" disabled selected hidden>Select a forum to join</option>
                        {this.state.forums.map(forum => {
                            return (
                                <option key={forum.id} my_key={forum.id}>
                                    {forum.name}
                                </option>
                            )
                        })}
                    </select>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}