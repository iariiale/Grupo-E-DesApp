import React, {Fragment, useState} from 'react';
import NavBar from './NavBar';
import '../styles/userProfile.css';

export default function userProfile(props) {

    let userString = localStorage.getItem("user")
    let userJSON = JSON.parse(userString)
    return(
        <Fragment>
            <NavBar history={props.history} />
            <div className="userProfile-container">
                <h2>{userJSON.userName}</h2>
                <div>Cantidad de puntos: {userJSON.amountOfPoints}</div>
            </div>
        </Fragment>
    )
}