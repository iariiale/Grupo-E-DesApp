import React, { Fragment, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {withNamespaces} from 'react-i18next';
import ProjectsCards from "./ProjectsCards";
import NavBar from './NavBar';
import '../styles/Home.css';
import i18n from '../i18n';

function changeToEnglish(){
  i18n.changeLanguage("en")
}

function changeToSpanish(){
  i18n.changeLanguage("es")
}


function Home(props) {
  let userString = localStorage.getItem("user")
  let userJSON = JSON.parse(userString)
  
  function addProject() {
    props.history.push('/addProject')
  }

  function addLocality() {
    props.history.push('/addLocality')
  }
  return (
      <Fragment>
        <button onClick={changeToEnglish} className={"en-button"}>EN</button>
        <button onClick={changeToSpanish}className={"es-button"}>ES</button>
        <NavBar history={props.history} showProjectsEnd={true}/> 
        <h2 className={"projects-tittle-home"}>{props.t('Proyectos destacados')}</h2>
          <ProjectsCards history={props.history}/>
          {userJSON && userJSON.numberOfProjectsClosed >= 0  && <button onClick={() => addProject()}>🤫Agregar proyecto</button>}
          {userJSON && userJSON.numberOfProjectsClosed >= 0  && <button onClick={() => addLocality()}>🤫Agregar localidad🤫</button>}
      </Fragment>
  );
}

export default withNamespaces()(Home);

