import React, { Fragment } from 'react';
import '../styles/Home.css';
import {withNamespaces} from 'react-i18next';
import SearchBar from "./SearchBar";
import ProjectsCards from "./ProjectsCards";

function Home(props) {
  return (
      <Fragment>
        <input type={"button"} value={props.t('Ingresar')} className={"log-in-home"} />
        <SearchBar />
        <h2 className={"projects-tittle-home"}>{props.t('Proyectos destacados')}</h2>
          <ProjectsCards history={props.history}/>
      </Fragment>
  );
}

export default withNamespaces()(Home);


//  <h1>{t('projects')}</h1>