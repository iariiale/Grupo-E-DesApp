import React, { Fragment } from 'react';
import '../styles/Home.css';
import {withNamespaces} from 'react-i18next';
import ProjectsCards from "./ProjectsCards";
import NavBar from './NavBar';
function Home(props) {
  return (
      <Fragment>
        <NavBar history={props.history}/> 
        <h2 className={"projects-tittle-home"}>{props.t('Proyectos destacados')}</h2>
          <ProjectsCards history={props.history}/>
      </Fragment>
  );
}

export default withNamespaces()(Home);

