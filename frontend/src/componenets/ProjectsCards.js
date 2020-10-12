import React, {Fragment, useState, useEffect} from 'react'
import '../styles/ProjectsCards.css'
import {withNamespaces} from 'react-i18next';
import axios from 'axios';
import AProject from "./AProject";

function ProjectsCards(props) {
  const[projects, setProjects] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/project/all')
          .then(res => setProjects(res.data))
          .catch(e => console.log(e))
  }, []);

  let projects_to_show = projects.map((aProject, i) =>  <AProject info={aProject} history={props.history}/> );
  return(
        <Fragment>
            {projects_to_show}
        </Fragment>
    )
}

export default withNamespaces()(ProjectsCards);