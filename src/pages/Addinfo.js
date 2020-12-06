import React, { Component } from "react"
import Navbar from '../components/Navbar';
import EditProfile from "../pages/Edit";

export default class Addinfo extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     name:this.props.name,
        //     major:this.props.major,
        //     nationality:this.props.nationality,
        //     year:this.props.year,
        // }
    }

    render() {
        return (
            <div>
                <Navbar loggedIn={true} />
                <h1>Tell your classmates a little bit about yourself!</h1>
                <EditProfile />
            </div>
            )
    }
}