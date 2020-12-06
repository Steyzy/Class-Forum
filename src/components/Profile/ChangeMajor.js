import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class ChangeMajor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoAttribute: "major",
            //allInfo: [],
            infoContent: props.infoContent? props.infoContent : ''
        }
        console.log(this.props)
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleProfileChange(event) {        
        event.preventDefault();
        const uid = auth().currentUser.uid;
        //const infoId = db.ref('/users/' + uid + '/personInfo/name/').push().key; // push: Generates a new child location using a unique key and returns its Reference.

        db.ref('/users/' + uid + '/profile/').update({ // set: Writes data to this Database location. This will overwrite any data at this location and all child locations.
            major: this.state.infoContent,
        });

        /*
        db.ref('users/' + uid + '/profile/name').update({
            value: true})   // The value is just to keep the node there. There's 
                            // no specific reason to sue boolean value
        //console.log(infoId)
        //console.log(this.state.infoAttribute)
        */
        alert("Successfully changed major!")
    }
    handleChange(event) {
        const uid = auth().currentUser.uid;
        console.log("handling change")
        console.log(uid)
        this.setState({ infoContent: event.target.value })
    }    
    // function name identified by React, do not change
    
    /*
    componentWillReceiveProps(props) {
        const uid = auth().currentUser.uid;
        this.setState({ 
            infoAttribute: "major", 
            infoContent: '', // needed to clear the textarea after switching forum
        })
        db.ref('/users/' + uid + '/personInfo/major').on('value', snapshot => { // ref.on is for reading data from a database
            let allInfo = [];
            snapshot.forEach(snap => {
                allInfo.push({content: snap.val().content, id: snap.key});
            });
            this.setState({ allInfo: allInfo});
        })
    }
    */
    
        
    render(){
        return (
            <div>
                <form onSubmit={this.handleProfileChange}>
                    <label>Change major: </label><br/>
                    <textarea value={this.state.infoContent}
                                onChange={this.handleChange}
                    /><br/>
                    <input type="submit" value="change"></input>   
                </form>
            </div>
        )
    }
}