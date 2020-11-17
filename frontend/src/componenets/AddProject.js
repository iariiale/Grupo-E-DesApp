import React, {useState, useEffect, Fragment} from 'react'
import {withNamespaces} from 'react-i18next';
import axios from 'axios';


function AddProject(props) {
    const [projectName, setProjectName] = useState('')
    const [porMin, setPorMin] = useState(0)
    const [date, setDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [factor, setFactor] = useState(0)
    const [localityName, setLocalityName] = useState('')

    function uploadProject() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/project/save',
            data: {
                "projectName": projectName,
                "porcentageMin": porMin,
                "startDate": date,
                "endDate": endDate,
                "factor": factor,
                "localityName": localityName
            }

        }).then(res => console.log(res.data))
          .catch(e => console.log(e))
    }

    
    return(
        <Fragment>
        <div>
            <input  type={"text"}
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)} 
                    placeholder={"Project name"}/>
            <input  type={"number"} 
                    placeholder={"Porcentage minimo"}
                    value={porMin}
                    onChange={(event) => setPorMin(event.target.value)}/>
            <input  type={"date"} 
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    placeholder={"Start date"}/>
            <input  type={"date"} 
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    placeholder={"End date"}/>
            <input type={"number"} 
                   value={factor}
                   onChange={(event)=> setFactor(event.target.value)}
                   placeholder={"factor"}/>
            <input  type={"text"} 
                    value={localityName}
                    onChange={(event) => setLocalityName(event.target.value)}placeholder={"Locality name"}/>
        </div>
        <div>
            <button onClick={() => uploadProject()}>Add</button>
            <button>Cancel</button>
        </div>
        </Fragment>
    )
}
    
export default withNamespaces()(AddProject);