import React, { Fragment, useEffect, useState } from 'react';
import {withNamespaces} from 'react-i18next';
import ProjectsCards from "./ProjectsCards";
import NavBar from './NavBar';
import '../styles/Home.css';
import i18n from '../i18n';
import axios from 'axios';

function changeToEnglish(){
  i18n.changeLanguage("en")
}

function changeToSpanish(){
  i18n.changeLanguage("es")
}


function Home(props) {
  const [isAdmin, setIsAdmin] = useState(false)
  let userString = localStorage.getItem("user")
  useEffect(() => {
      if(userString){
          axios.get('http://localhost:8080/user/isAdmin/' + JSON.parse(userString))
          .then(res => setIsAdmin(res.data))
          .catch(() => setIsAdmin(false))
      }
  })

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
         
          {isAdmin &&  <button className={"log-in-home"} onClick={() => addProject()}>🤫{props.t('Agregar proyecto')}</button>}
          {isAdmin &&  <button className={"log-in-home"} onClick={() => addLocality()}>🤫{props.t('Agregar localidad')}</button>}
      </Fragment>
  );
}

export default withNamespaces()(Home);

