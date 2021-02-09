import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { Logout } from "../auth/Logout"


export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/collections">Collections</Link>
            </li>
            <li className="navbar__item">
                <button className="logOut" onClick={Logout()}>Logout</button>
            </li>
        </ul>
    )
}