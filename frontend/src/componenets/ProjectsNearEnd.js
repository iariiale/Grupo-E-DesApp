import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import AProject from "./AProject";
import i18n from '../i18n';
import NavBar from './NavBar';
import {withNamespaces} from 'react-i18next';

function ProjectsNearEnd(props) {
    const [projectsNearEnd, setProjectsNearEnd] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/project/getProjectsNearEndDate/')
        .then(res => setProjectsNearEnd(res.data))
        .catch(e => console.log(e))
    }, [])
    function changeToEnglish(){
        i18n.changeLanguage("en")
      }
      
      function changeToSpanish(){
        i18n.changeLanguage("es")
      }
    let projects_to_show = projectsNearEnd.map((aProject, i) =>  <AProject   key={i} 
                                                                      info={aProject}
                                                                      history={props.history}/> );
    return(
        <Fragment>
        <button onClick={changeToEnglish} className={"en-button"}>EN</button>
        <button onClick={changeToSpanish}className={"es-button"}>ES</button>
        <NavBar history={props.history}/> 
        <h2 className={"projects-tittle-home"}>{props.t('Proyectos cerca de terminar')}</h2>
        <div className={"projects-cards-container"}>
            {projects_to_show}
        </div>
        </Fragment>
    )
}

export default withNamespaces()(ProjectsNearEnd);