import React, {useState, useEffect, Fragment} from 'react'
import '../styles/ProjectDetail.css'
import LocalidadInfo from "./LocalidadInfo";
import {withNamespaces} from 'react-i18next';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap'
import axios from 'axios'

function ProjectDetail(props) {
    const [details, setDetails] = useState({});
    const [amountToDonate, setAmount] = useState(0);
    const [comment, setcomment] = useState('');
    const [totalMoney, setTotalMoney] = useState(0);

    useEffect(() => {
        setDetails(props.info);
        axios.get('http://localhost:8080/project/moneyToCollect/' + props.info.projectName)
        .then(res => setTotalMoney(res.data))
        .catch(e => console.log(e))
    },[]);

    function handleDonate(){
        if(amountToDonate === 0) {
            alert("Che no seas raton estas donando 0 pesos")
            return
        }
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/project/makeDonation',
            data: {
                "username": "usuarioUno",
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
              
                <div>Lleva recaudad:{details.amountCollected}</div>
                <div className={"progress-bar"}><ProgressBar now={progress} label={`${progress}%`}variant={'success'}/></div>
                <div>Este proyecto le da internet a: {details.amountOfPopulationForProject} personas</div>
                <input type={"number"}
                       value={amountToDonate}
                       onChange={(event) => setAmount(event.target.value)} 
                       className={"donar-number"}/>
                <input type={"text"}
                       value={comment}
                       placeholder={"Comentarios(optional)"}
                       className={"comment-container"}
                       onChange={(e) => setcomment(e.target.value)}
                       />
               
                <input type={"button"}
                       value={"Donar"}
                       className={"donar-project-button"}
                       onClick={handleDonate}/>
            </div>
        </Fragment>
    )
}

export default withNamespaces()(ProjectDetail);