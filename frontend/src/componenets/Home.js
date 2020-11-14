import React, { Fragment, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {withNamespaces} from 'react-i18next';
import ProjectsCards from "./ProjectsCards";
import NavBar from './NavBar';
import '../styles/Home.css';

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

