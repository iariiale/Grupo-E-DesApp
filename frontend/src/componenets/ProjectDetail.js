import React, {useState, useEffect, Fragment} from 'react'
import '../styles/ProjectDetail.css'
import {withNamespaces} from 'react-i18next';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap'
import axios from 'axios'

function ProjectDetail(props) {
    const [details, setDetails] = useState({});
    const [amountToDonate, setAmount] = useState(0);
    const [comment, setcomment] = useState('');
    const [totalMoney, setTotalMoney] = useState(0);
    let userString = localStorage.getItem("user")
    let userJSON = JSON.parse(userString)

    useEffect(() => {
        setDetails(props.info);
        axios.get('https://pacific-shelf-14196.herokuapp.com/project/moneyToCollect/' + props.info.projectName)
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
        })
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
               
                <input type={"button"}
                       value={props.t("Donar")}
                       className={"donar-project-button"}
                       onClick={handleDonate}/>
                {userJSON &&    <input  type={"button"} c
                                        onClick={() =>closeProject()}
                                        className={"donar-project-button"}
                                        id={"extra-margin-top"}
                                        value={"Close project"}/>}
            </div>
        </Fragment>
    )
}

export default withNamespaces()(ProjectDetail);