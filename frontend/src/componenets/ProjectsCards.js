import React, {Fragment, useState, useEffect} from 'react'
import '../styles/ProjectsCards.css'
import {withNamespaces} from 'react-i18next';
import axios from 'axios';
import Paginator from './Paginator';
import AProject from "./AProject";

function ProjectsCards(props) {
  const[projects, setProjects] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/project/get/0')
          .then(res => setProjects(res.data))
          .catch(e => console.log(e))
  }, []);


  function changePage(projectsToShow) {
    setProjects(projectsToShow)
  }
  let projects_to_show = projects.map((aProject, i) =>  <AProject   key={i} 
                                                                    info={aProject}
                                                                    history={props.history}/> );
  return(
        <Fragment>
            <div className={"projects-cards-container"}>
            {projects_to_show}
            </div>
            <Paginator onChangePage={changePage}/>
        </Fragment>
    )
}

export default withNamespaces()(ProjectsCards);