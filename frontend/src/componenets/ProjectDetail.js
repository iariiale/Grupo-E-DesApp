import React, {useState, useEffect, Fragment} from 'react';
import '../styles/ProjectDetail.css'; 
import {withNamespaces} from 'react-i18next';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Comment from './Comment';
import 'react-toastify/dist/ReactToastify.css';

function ProjectDetail(props) {
    const [details, setDetails] = useState({});
    const [amountToDonate, setAmount] = useState(0);
    const [comment, setCommentDonation] = useState('');
    const [totalMoney, setTotalMoney] = useState(0);
    const [commnets, setcomments] = useState([])
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)

    let userString = localStorage.getItem("user")
    useEffect(() => {
        if(userString){
            axios.get('http://localhost:8080/user/isAdmin/' + JSON.parse(userString))
            .then(res => setIsAdmin(res.data))
            .catch(() => setIsAdmin(false))
        }

        axios.get('http://localhost:8080/project/getByName/' + props.info.projectName)
        .then(res => setDetails(res.data))
        .catch(() => setDetails({}))
        axios.get('http://localhost:8080/project/moneyToCollect/' + props.info.projectName)
        .then(res => setTotalMoney(res.data))
        .catch(() => setTotalMoney(0))
        axios.get('http://localhost:8080/project/getComments/' + props.info.projectName)
        .then(res => setcomments(res.data))
        .catch(() => setcomments([]))

    },[]);
    function toastError(message) {
        toast.configure();
        return toast.error(message, {
            position: toast.POSITION.TOP_CENTER
          });
    }
    function toastInfo(message) {
        toast.configure();
        return toast.success(message, {
            position: toast.POSITION.TOP_CENTER
          });
    }
    function closeProject() {
         axios({
                url: 'http://localhost:8080/project/closeProject',
                method: 'post',
                data: {
                    "projectName": details.projectName, 
                    "userAdmin": JSON.parse(userString)
                }
            }).then(res => toastInfo(res.data))
               .catch(e => toastError(e.request.response))
        setTimeout( () => setLoading(false), 3200);
        
    }

    function handleDonate() {
        let userString = localStorage.getItem("user")
        if(amountToDonate === 0) {
            toastError("Che no seas ratón tenes que donar algo")
            return
        }
        if(amountToDonate < 0) {
            toastError("Tenes que donar algo mayor a cero, titan")
            return
        }
        if(!userString) {
            toastError("No podes donar si no estas registradx")
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/project/makeDonation',
            data: {
                "username": JSON.parse(userString),
                "amountDonated": amountToDonate,
                "projectName": details.projectName,
                "comment": comment
            }
        }).then(() => window.location.reload())
          .catch(e => console.log(e))
    }
    
    function calculateProgress() {
        return (details.amountCollected * 100) / totalMoney
    }

    let progress = calculateProgress()
    let comments_to_show = commnets.map((aComent, i) => aComent !== "" ? <Comment message={aComent} key={i} /> : null)
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
                       onChange={e => setCommentDonation(e.target.value)}
                       />
                    
                {details.finished ?<div className={"project-close-info"}>PROJECT CLOSE</div> :
                                    <input  type={"button"}
                                            value={props.t("Donar")}
                                            className={"donar-project-button"}
                                            onClick={handleDonate}/>  }
                
                {isAdmin  && !loading  &&  
                                            <input  type={"button"} 
                                                    onClick={() =>{setLoading(true); setTimeout(
                                                                () => closeProject(),   1000);}}
                                                    className={"donar-project-button"}
                                                    id={"extra-margin-top"}
                                                    value={"Close project"}/>}
                {isAdmin &&  loading  &&  <div> 
                                            <ClipLoader
                                                size={150}
                                                color={"#123abc"}
                                                loading={loading} 
                                            />
                                            </div>}
                {comments_to_show}
            </div>
        </Fragment>
    )
}

export default withNamespaces()(ProjectDetail);