import React, { Component } from "react"
import Navbar from '../components/Navbar';
import ChangeName from "../components/Profile/ChangeName";
import ChangeNationality from "../components/Profile/ChangeNationality";
import ChangeYear from "../components/Profile/ChangeYear";



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <Navbar loggedIn={true} />
                <ChangeName />
                <ChangeNationality />
                <ChangeYear />
            </div>
        )
    }
}