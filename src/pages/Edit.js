import React, { Component } from "react"
import Navbar from '../components/Navbar';
import ChangeName from "../components/Profile/ChangeName";
import ChangeNationality from "../components/Profile/ChangeNationality";
import ChangeYear from "../components/Profile/ChangeYear";
import ChangeMajor from "../components/Profile/ChangeMajor";
import { Link } from 'react-router-dom';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
            major:this.props.major,
            nationality:this.props.nationality,
            year:this.props.year,
        }
    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <Navbar loggedIn={true} />
                <ChangeName/>
                <ChangeNationality/>
                <ChangeYear/>
                <ChangeMajor/>
                <Link to="/profile">Done</Link>
            </div>
            )
    }
}