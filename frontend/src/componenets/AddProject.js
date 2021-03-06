import React, {useState, Fragment} from 'react'
import {withNamespaces} from 'react-i18next';
import axios from 'axios';
import '../styles/AddProject.css';
import i18n from '../i18n';

function AddProject(props) {
    const [projectName, setProjectName] = useState('')
    const [porMin, setPorMin] = useState(0)
    const [date, setDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [factor, setFactor] = useState(0)
    const [localityName, setLocalityName] = useState('')

    const [projectNameError, setprojectNameError] = useState(false)
    const [porMinError, setporMinError] = useState(false)
    const [dateError, setdateError] = useState(false)
    const [dateEndError, setdateEndError] = useState(false)
    const [localityError, setlocalityError] = useState(false)
    function changeToEnglish(){
        i18n.changeLanguage("en")
        }
        
    function changeToSpanish(){
    i18n.changeLanguage("es")
    }

    function uploadProject() {
        if( projectName === "" || 
            projectName.length <= 3 || 
            porMin <= 0 || 
            date === "" || 
            endDate === "" || 
            localityName === "" || 
            localityName.length <= 3) {
            if(projectName === "" || projectName.length <= 3) {
                setprojectNameError(true)
            }
            if(porMin <= 0) {
                setporMinError(true)
            }
            if(date === "" ) {
                setdateError(true)
            }
            if(endDate === "" ) {
                setdateEndError(true)
            }
            if(localityName === "" || localityName.length <= 3) {
                setlocalityError(true)
            }
    }   else {
            axios({
                method: 'post',
                url: 'http://localhost:8080/project/save',
                data: {
                    "projectName": projectName,
                    "porcentageMin": porMin,
                    "startDate": date,
                    "endDate": endDate,
                    "factor": factor === 0 ? 100 : factor,
                    "localityName": localityName
                }

            }).then(res =>{alert("Proyect upload!") 
                           props.history.goBack()})
            .catch(e => console.log(e))
        }
    }
    function goBack(){
        props.history.push("/")
    }
    
    return(
        <Fragment>
        <button onClick={changeToEnglish} className={"en-button"}>EN</button>
        <button onClick={changeToSpanish}className={"es-button"}>ES</button>
        <div className={"add-project-metacontainer"}>
            <div className={"add-project-container"}>
            <div>{props.t('Project Name')}</div>
            <input  type={"text"}
                    value={projectName}
                    className={"input-add-admin"}
                    onChange={(event) => {setProjectName(event.target.value)
                                          setprojectNameError(false) }} 
                    placeholder={props.t('Project Name')}/>
            {projectNameError && <div className={"error-input"}>{props.t('Dont Leave the project name blank')}</div>}
            <div>{props.t('Minimun percentage')}</div>
            <input  type={"number"} 
                    className={"input-add-admin"}
                    placeholder={props.t('Minimun percentage')}
                    value={porMin}
                    onChange={(event) => {setPorMin(event.target.value)
                                          setporMinError(false)}}/>
            {porMinError && <div className={"error-input"}>{props.t('Dont Leave the minum percentage blank')}</div>}
            <div>{props.t('Start project date')}</div>
            <input  type={"date"} 
                    className={"input-add-admin"}
                    value={date}
                    onChange={(event) => {setDate(event.target.value)
                                          setdateError(false)}}
                    placeholder={"Start date"}/>
             {dateError && <div className={"error-input"}>{props.t('Dont Leave the start projecte date blank')}</div>}
            <div>{props.t('End project date')}</div>
            <input  type={"date"} 
                    className={"input-add-admin"}
                    value={endDate}
                    onChange={(event) => {setEndDate(event.target.value)
                                          setdateEndError(false)}}
                    placeholder={"End date"}/>
             {dateEndError && <div className={"error-input"}>{props.t('Dont Leave the end date blank')}</div>}
            <div>{props.t('Factor(optional by default is 100)')}</div>
            <input type={"number"}
                    className={"input-add-admin"} 
                   value={factor}
                   onChange={(event)=> setFactor(event.target.value)}
                   placeholder={"factor"}/>
            <div>{props.t('Locality name')}</div>
            <input  type={"text"} 
                    className={"input-add-admin"}
                    value={localityName}
                    onChange={(event) => {setLocalityName(event.target.value)
                                          setlocalityError(false)}}
                    placeholder={props.t('Locality name')}/>
             {localityError && <div className={"error-input"}>{props.t('Dont Leave the locality blank')}</div>}
            <div className={"buttons-container"}>
                <button className={"home-search-button"} 
                        onClick={() => uploadProject()}
                        id={"extra-margin-right"}>
                        {props.t('Add')}
                </button>
                <button className={"home-search-button"} 
                        onClick={() => goBack()}>
                            {props.t('Cancel')}
                            </button>
            </div>
            </div>
        </div>
        </Fragment>
    )
}
    
export default withNamespaces()(AddProject);