import React, {Fragment, useEffect, useState} from 'react';
import NavBar from './NavBar';
import '../styles/userProfile.css';
import axios from 'axios';
import DonationRecordCard from './DonationRecordCard';

export default function UserProfile(props) {
    const [amountOfPoints, setAmount] = useState(0)
    const [records, setRecords] = useState([])
    const [user, setuser] = useState({})

    useEffect(() => {
        let userString = localStorage.getItem("user")
        let userJSON = JSON.parse(userString)
        setuser(userJSON)
        axios.get('http://localhost:8080/user/amountOfPoints/' + userJSON.userName)
            .then(res => setAmount(res.data))
            .catch(e => console.log(e))
        axios.get('http://localhost:8080/user/GetDonationsRecords/' + userJSON.userName)
            .then(res => setRecords(res.data))
            .catch(e => console.log(e))
    }, [])
    let donationRecords = records.map((aRecord, i) => <DonationRecordCard info={aRecord} key={i} />)

    return(
        <Fragment>
            <div className="userProfile-container">
                <h2>{user.userName}</h2>
                <div>Cantidad de puntos: {amountOfPoints}</div>
                <div>Donation registry</div>
                {donationRecords}
                <button className={"home-search-button"}
                        onClick={() => props.history.goBack()}>Home</button>
            </div>
            
        </Fragment>
    )
}