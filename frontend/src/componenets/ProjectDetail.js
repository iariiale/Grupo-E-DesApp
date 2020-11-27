import React, {useState, useEffect, Fragment} from 'react'
import '../styles/ProjectDetail.css'
import {withNamespaces} from 'react-i18next';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {ProgressBar} from 'react-bootstrap'
import axios from 'axios'

function ProjectDetail(props) {
    const [details, setDetails] = useState({});
    const [amountToDonate, setAmount] = useState(0);
    const [comment, setcomment] = useState('');
    const [totalMoney, setTotalMoney] = useState(0);
    const [loading, setLoading] = useState(false);

    let userString = localStorage.getItem("user")
    let userJSON = JSON.parse(userString)
    useEffect(() => {
        setDetails(props.info);
        axios.get('http://localhost:8080/project/moneyToCollect/' + props.info.projectName)
        .then(res => setTotalMoney(res.data))
        .catch(e => console.log(e))
    },[]);

    function closeProject() {
         axios({
                url: 'http://localhost:8080/project/closeProject',
                method: 'post',
                data: {
                    "projectName": details.projectName, 
                    "userAdmin": userJSON.userName
                }
            }).then(res => alert(res.data))
               .catch(e => alert(e.request.response))
        setTimeout( () => setLoading(false), 3200);
        
    }

    function handleDonate() {
        let userString = localStorage.getItem("user")
        if(amountToDonate === 0) {
            alert("Che no seas raton estas donando 0 pesos")
            return
        }
        if(amountToDonate < 0) {
            alert("Tenes que donar algo mayor a cero, titan")
            return
        }
        if(!userString) {
            alert("No podes donar si no estas registradx")
            return
        }
        let userJSON = JSON.parse(userString)  
        axios({
            method: 'post',
            url: 'http://localhost:8080/project/makeDonation',
            data: {
                "username": userJSON.userName,
                "amountDonated": amountToDonate,
                "projectName": details.projectName
            }
        }).then(res => setDetails(  {'projectName': details.projectName,
                                            'amountCollected': res.data,
                                            'amountOfPopulationForProject': details.amountOfPopulationForProject,
                                            'factor': details.factor}))
          .catch(e => console.log(e))
    }
    
    function calculateProgress() {
        return (details.amountCollected * 100) / totalMoney
    }

    let progress = calculateProgress()
    return(
        <Fragment>
            <div className={"project-info-container"}>
                <h2 className={"tittle"}>{details.projectName}</h2>
                <div>{props.t('Lleva recaudad')}: {details.amountCollected}</div>
                <div className={"progress-bar"}><ProgressBar now={progress} label={`${progress}%`}variant={'success'}/></div>
                <div>{props.t('Este proyecto le da internet a')}: {details.amountOfPopulationForProject} {props.t('personas')}</div>
                <input type={"number"}
                       min="0"
                       value={amountToDonate}
                       onChange={(event) => setAmount(event.target.value)} 
                       className={"donar-number"}/>
                <input type={"text"}
                       value={comment}
                       placeholder={props.t("Comentarios(optional)")}
                       className={"comment-container"}
                       onChange={(e) => setcomment(e.target.value)}
                       />
                {details.finished ?<div className={"project-close-info"}>PROJECT CLOSE</div> :
                                    <input  type={"button"}
                                            value={props.t("Donar")}
                                            className={"donar-project-button"}
                                            onClick={handleDonate}/>  }
                                    
                {userJSON.numberOfProjectsClosed &&  !loading  &&  <input  type={"button"} 
                                                    onClick={() =>{setLoading(true); setTimeout(
                                                                                        () => closeProject(),   1000);}}
                                                    className={"donar-project-button"}
                                                    id={"extra-margin-top"}
                                                    value={"Close project"}/>}
                {userJSON.numberOfProjectsClosed &&  loading  &&  <div> 
                                            <ClipLoader
                                                size={150}
                                                color={"#123abc"}
                                                loading={loading} 
                                            />
                                            </div>}
            </div>
        </Fragment>
    )
}

export default withNamespaces()(ProjectDetail);