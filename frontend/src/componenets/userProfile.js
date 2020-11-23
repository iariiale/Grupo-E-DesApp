import React, {Fragment, useEffect, useState} from 'react';
import '../styles/userProfile.css';
import axios from 'axios';
import DonationRecordCard from './DonationRecordCard';
import i18n from '../i18n';


export default function UserProfile(props) {
    const [amountOfPoints, setAmount] = useState(0)
    const [records, setRecords] = useState([])
    const [user, setuser] = useState({})
    function changeToEnglish(){
        i18n.changeLanguage("en")
      }
      
      function changeToSpanish(){
        i18n.changeLanguage("es")
      }

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

    function logout() {
        localStorage.removeItem("user")
        props.history.push("/")
    }
    let donationRecords = records.map((aRecord, i) => <DonationRecordCard info={aRecord} key={i} />)

    return(
        <Fragment>
        <button onClick={changeToEnglish} className={"en-button"}>EN</button>
        <button onClick={changeToSpanish}className={"es-button"}>ES</button>
            <div className="userProfile-container">
                <h2>{user.userName}</h2>
                <div>{i18n.t('Amount of points')} {amountOfPoints}</div>
                <div>{i18n.t('Registro de donaciones')}</div>
                {donationRecords}
                <div>
                <button className={"home-search-button"}
                        onClick={() => props.history.goBack()}>Home</button>
                <button className={"home-search-button"}
                        onClick={() => logout()}>Log out</button>
                </div>
            </div>
            
        </Fragment>
    )
}