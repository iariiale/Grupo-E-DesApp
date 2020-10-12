import React, {Fragment} from 'react';
import '../styles/AProject.css';
import {withNamespaces} from "react-i18next";


function AProject(props) {

    function seeProjectDetail() {
       props.history.push({
           pathname: 'projectDetail',
           state: props.info
       })
    }
    return(
        <Fragment>
            <div className={"project-card"}>
                <div id={"project-name"}>{props.info.projectName}</div>
                <div id={"locality-name-card"}>{props.info.locality.name}</div>
                <div>💸{props.info.amountCollected}</div>
                <input type={"button"}
                       className={'info-project-card'}
                       value={props.t('ver mas')}
                       onClick={seeProjectDetail}/>
            </div>
        </Fragment>
    )
}

export default withNamespaces()(AProject);
