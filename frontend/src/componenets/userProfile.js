import React, {Fragment, useEffect, useState} from 'react';
import NavBar from './NavBar';
import '../styles/userProfile.css';
import axios from 'axios';

export default function UserProfile(props) {
    const [amountOfPoints, setAmount] = useState(0)
    const [user, setuser] = useState({})

    useEffect(() => {
        let userString = localStorage.getItem("user")
        let userJSON = JSON.parse(userString)
        setuser(userJSON)
        axios.get('http://localhost:8080/user/amountOfPoints/' + userJSON.userName)
            .then(res => setAmount(res.data))
            .catch(e => console.log(e))
    
    }, [])

    return(
        <Fragment>
            <NavBar history={props.history} />
            <div className="userProfile-container">
                <h2>{user.userName}</h2>
                <div>Cantidad de puntos: {amountOfPoints}</div>
                <button className={"home-search-button"}
                        onClick={() => props.history.goBack()}>Home</button>
            </div>
            
        </Fragment>
    )
}