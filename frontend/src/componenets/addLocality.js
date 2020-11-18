import React, {useState, useEffect, Fragment} from 'react'
import {withNamespaces} from 'react-i18next';
import axios from 'axios';
import i18n from '../i18n';


function AddLocality(props) {
    const [localityName, setlocalityName] = useState('')
    const [province, setprovince] = useState('')
    const [amountOfPopulation, setamountOfPopulation] = useState(0)
    const [isConnected, setisConnected] = useState(false)
    function changeToEnglish(){
        i18n.changeLanguage("en")
        }
        
    function changeToSpanish(){
    i18n.changeLanguage("es")
    }

    function goBack() {
        props.history.push("/home")
    }
    function uploadLocality() {
       axios({
           method: 'post',
           url: 'http://localhost:8080/locality/create',
           data: {
            "name": localityName, 
            "province": province, 
            "amountOfPopulation": amountOfPopulation,
            "isConnected": isConnected
           }
       }).then(res => console.log(res.data))
       .catch(e => console.log(e))
    }
    return(
        <Fragment>
        <button onClick={changeToEnglish} className={"en-button"}>EN</button>
        <button onClick={changeToSpanish}className={"es-button"}>ES</button>
        <div>
            <input  type={"text"}
                    value={localityName}
                    onChange={(event) => setlocalityName(event.target.value)} 
                    placeholder={"Locality name"}/>
            <input  type={"number"} 
                    placeholder={"Amount of population"}
                    value={amountOfPopulation}
                    onChange={(event) => setamountOfPopulation(event.target.value)}/>
            <input  type={"text"} 
                    value={province}
                    onChange={(event) => setprovince(event.target.value)}placeholder={"Province name"}/>
            <input  type={"text"} 
                    value={isConnected}
                    onChange={(event) => setisConnected(event.target.value)}placeholder={"Locality name"}/>
        </div>
        <div>
            <button onClick={() => uploadLocality()}>{props.t('Add')}</button>
            <button onClick={() => goBack()}>{props.t('Cancel')}</button>
        </div>
        </Fragment>
    )
}

export default withNamespaces()(AddLocality);