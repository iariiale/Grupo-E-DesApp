import React, {Fragment} from 'react';
import {withNamespaces} from 'react-i18next';
import '../styles/SearchBar.css';


function SearchBar(props) {
    function getProjetsNearEnd() {
        props.history.push('/nearEndProjects')
    }
    function etGohome(){
        props.history.push('/')
    }
    return(
        <Fragment>
            <div className={"home-search-bar"}>
                <input type={"text"} placeholder={props.t('Buscar')} className={"search-bar"}/>
                <input type={"button"} value={props.t('Buscar')} className={"home-search-button"}/>
                
                {props.showProjectsEnd ? <input  type={"button"} 
                                                 value={props.t('Projects neear end')}
                                                 className={"home-search-button"}
                                                 id={"projects-end"}
                                                 onClick={() => getProjetsNearEnd()}/> :

                                        <input  type={"button"} 
                                                value={props.t('Home')}
                                                className={"home-search-button"}
                                                id={"projects-end"}
                                                onClick={() => etGohome()}/> 

                }
            </div>
        </Fragment>
    );
}


export default withNamespaces()(SearchBar);