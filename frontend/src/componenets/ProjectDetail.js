import React, {useState, useEffect, Fragment} from 'react'
import '../styles/ProjectDetail.css'
import LocalidadInfo from "./LocalidadInfo";
import {withNamespaces} from 'react-i18next';
import axios from 'axios'

function ProjectDetail(props) {
    const [details, setDetails] = useState({});
    const [amountToDonate, setAmount] = useState(0);

    useEffect(() => {
        setDetails(props.info);
    },[]);

    function handleDonate(){
        axios({
            method: 'post',
            url: 'http://localhost:8080/project/makeDonation',
            data: {
                "username": "usuario dos",
                "amountDonated": amountToDonate,
                "projectName": details.projectName
            }
        }).then(res => setDetails(  {'projectName': details.projectName,
                                            'amountCollected': res.data,
                                            'amountOfPopulationForProject': details.amountOfPopulationForProject,
                                            'factor': details.factor}))
          .catch(e => console.log(e))
    }
    return(
        <Fragment>
            <div className={"project-info-container"}>
                <h2>{details.projectName}</h2>
                <div>{details.amountCollected}</div>
                {//hacer una barra que se vaya completando en verde
                    //agregar comentarios en donacion tanto en back como front
                    //name province, amountOfPopulation
                }
                <div>{details.amountOfPopulationForProject}</div>
                <div>{details.factor}</div>
                <input type={"number"}
                       value={amountToDonate}
                       onChange={(event) => setAmount(event.target.value)} />
                <input type={"button"}
                       value={"Donar"}
                       className={"donar-project-button"}
                       onClick={handleDonate}/>
            </div>
        </Fragment>
    )
}

export default withNamespaces()(ProjectDetail);