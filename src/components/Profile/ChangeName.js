import React, { Component } from "react"
import { auth, db } from "../../services/firebase.js"

export default class ChangeName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoAttribute: "name",
            //allInfo: [],
            infoContent: this.props.infoContent? this.props.infoContent : '',
        }
        {console.log(this.props)
        console.log(this.props.infoContent)
        }
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleProfileChange(event) {        
        event.preventDefault();
        const uid = auth().currentUser.uid;
        //const infoId = db.ref('/users/' + uid + '/personInfo/name/').push().key; // push: Generates a new child location using a unique key and returns its Reference.

        if (this.state.infoContent == ''){
            alert("Name must be none-empty.")
            return
        }
        
        db.ref('/users/' + uid + '/profile/').update({ // set: Writes data to this Database location. This will overwrite any data at this location and all child locations.
            name: this.state.infoContent,
        });

        alert("Successfully changed name!")
    }
    

    
    handleChange(event) {
        //const uid = auth().currentUser.uid;
        console.log("handling change")
        {console.log(event.target.value)}
        this.setState({ infoContent: event.target.value })
    }    
    // function name identified by React, do not change
    
    
    /*
    componentWillReceiveProps(props) {
        const uid = auth().currentUser.uid;
        this.setState({ 
            infoAttribute: "name", 
            infoContent: '', // needed to clear the textarea after switching forum
        })
        db.ref('/users/' + uid + '/personInfo/name').on('value', snapshot => { // ref.on is for reading data from a database
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
                    <label>Change name: </label><br/>
                    <textarea value={this.state.infoContent}
                                onChange={this.handleChange}
                    /><br/>
                    <input type="submit" value="change"></input>   
                </form>
            </div>
        )
    }
}