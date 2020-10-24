import React, {Fragment} from 'react';
import {withNamespaces} from 'react-i18next';
import LocalidadInfo from "./LocalidadInfo";
import ProjectDetail from "./ProjectDetail";
import '../styles/ProjectWrapper.css'

function ProjectWrapper(props){

    return(
        <Fragment>
        <div className={"project-locality-container"}>
            <div className= {"projecto-item"}><ProjectDetail info={props.location.state}/></div>
            <div className={"description-item"}><LocalidadInfo info={props.location.state.locality} /></div>
        </div>
        <button className={"go-back-button"}
                onClick={() => props.history.push("/")}>HOME</button>
        </Fragment>
    )
}

export default withNamespaces()(ProjectWrapper);