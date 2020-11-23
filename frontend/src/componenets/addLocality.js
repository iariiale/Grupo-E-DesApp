import React, {useState, Fragment} from 'react'
import {withNamespaces} from 'react-i18next';
import '../styles/AddProject.css';
import axios from 'axios';
import i18n from '../i18n';


function AddLocality(props) {
    const [localityName, setlocalityName] = useState('')
    const [province, setprovince] = useState('')
    const [amountOfPopulation, setamountOfPopulation] = useState(0)
    const [isConnected, setisConnected] = useState(false)

    const [localityNameError, setlocalityNameError] = useState(false)
    const [provinceError, setprovinceError] = useState(false)
    const [amountOfPopulationError, setamountOfPopulationError] = useState(false)
    const [isConnectedError, setisConnectedError] = useState(false)

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
       if(  localityName === "" || localityName.length < 3 ||
            province  === "" ||province.length < 3 ||
            amountOfPopulation  <= 100 ||
            isConnected === "") {
            if(localityName === "" || localityName.length < 3 ){
                setlocalityNameError(true)
            }
            if(province  === "" ||province.length < 3) {
                setprovinceError(true)
            }
            if(amountOfPopulation  <= 100) {
                setamountOfPopulationError(true)
            }    
            if(isConnected === "") {
                setisConnectedError(true)
            }
         } else {
            axios({
                method: 'post',
                url: 'http://localhost:8080/locality/create',
                data: {
                    "name": localityName, 
                    "province": province, 
                    "amountOfPopulation": amountOfPopulation,
                    "isConnected": isConnected
                }
            }).then(() => {alert("localidad uploaded")
                           props.history.goBack()})
            .catch(e => console.log(e))
    }}
    return(
        <Fragment>
        <button onClick={changeToEnglish} className={"en-button"}>EN</button>
        <button onClick={changeToSpanish}className={"es-button"}>ES</button>
        <div className={"add-project-metacontainer"}>
            <div className={"add-project-container"}>
            <input  type={"text"}
                    className={"input-add-admin"}
                    value={localityName}
                    onChange={(event) => {setlocalityName(event.target.value)
                                            setlocalityNameError(false)}} 
                    placeholder={"Locality name"}/>
            {localityNameError && <div className={"error-input"}>{props.t('Dont Leave the locality name blank')}</div>}
            <input  type={"number"}
                    className={"input-add-admin"}
                    placeholder={"Amount of population"}
                    value={amountOfPopulation}
                    onChange={(event) => {setamountOfPopulation(event.target.value)
                                          setamountOfPopulationError(false)}}/>
            {amountOfPopulationError && <div className={"error-input"}>{props.t('Invalid amount of population')}</div>}        
            <input  type={"text"}
                    className={"input-add-admin"}
                    value={province}
                    onChange={(event) => {setprovince(event.target.value)
                                          setprovinceError(false)}}
                    placeholder={"Province name"}/>
            {provinceError && <div className={"error-input"}>{props.t('Dont Leave the province name blank')}</div>}
            <input  type={"text"}
                    className={"input-add-admin"}
                    value={isConnected}
                    onChange={(event) => {setisConnected(event.target.value)
                                            setisConnectedError(false)}}
                    placeholder={"Locality name"}/>
            {isConnectedError && <div className={"error-input"}>Invalid connected input</div>}        
        
        <div className={"buttons-container"}>
            <button className={"home-search-button"}
                    id={"extra-margin-right"}
                    onClick={() => uploadLocality()}>{props.t('Add')}</button>
            <button className={"home-search-button"}
                    onClick={() => goBack()}>{props.t('Cancel')}</button>
        </div>
        </div>
        </div>

        </Fragment>
    )
}

export default withNamespaces()(AddLocality);