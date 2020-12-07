import React, { Component } from "react"
import { logout } from "../../helpers/auth"

export default class ForumNav extends Component {
    render() {
        return(
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <a class="navbar-brand">Forum</a>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="/forum" class="nav-link">Forum</a>
                    </li>
                    <li>
                        <a href="/profile" class="nav-link">Profile</a>
                    </li>
                    <li>
                        <a onClick={logout} class="nav-link">Log Out</a>
                    </li>
                </ul>
            </nav>
        )
    }
}