import React, {Fragment} from 'react';
import i18n from '../i18n';
import NavBar from './NavBar';
import {withNamespaces} from 'react-i18next';
import AProject from "./AProject";

function changeToEnglish(){
    i18n.changeLanguage("en")
  }
  
  function changeToSpanish(){
    i18n.changeLanguage("es")
  }
  
function SearchResult(props) {
    let projects_to_show = props.location.state.detail.map((aProject, i) =>  <AProject   key={i} 
    info={aProject}
    history={props.history}/> );
    return(
        <Fragment>
            <button onClick={changeToEnglish} className={"en-button"}>EN</button>
            <button onClick={changeToSpanish}className={"es-button"}>ES</button>
            <NavBar history={props.history} showProjectsEnd={true}/> 
            <h2 className={"projects-tittle-home"}>{props.t('Resultado de busqueda')}</h2>
            <div className={"projects-cards-container"}>{projects_to_show}</div>
                <div className="userProfile-container">
                    <button     className={"home-search-button"}
                                onClick={() => props.history.push("/")}>Home</button>
                </div>
        </Fragment>
    )
}

export default withNamespaces()(SearchResult);