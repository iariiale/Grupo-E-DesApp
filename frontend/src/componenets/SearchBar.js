import React, {useState, Fragment} from 'react';
import {withNamespaces} from 'react-i18next';
import '../styles/SearchBar.css';
import axios from 'axios';

function SearchBar(props) {
    const [valueSearch, setSearchValue] = useState('')

    function getProjetsNearEnd() {
        props.history.push('/nearEndProjects')
    }
    function etGohome(){
        props.history.push('/')
    }
    
    function searchProject() {
        if(valueSearch === ''){
            alert("No buscaste nada!")
            return
        }
        axios.get('http://localhost:8080/project/getAnyProjectWith/' + valueSearch)
        .then(res => props.history.push({pathname: '/searchResult', state: {detail: res.data}}))
        .catch(e => console.log(e))
    }
    return(
        <Fragment>
            <div className={"home-search-bar"}>
                <input  type={"text"} 
                        placeholder={props.t('Buscar')}
                        className={"search-bar"}
                        onChange={event => setSearchValue(event.target.value)}/>
                <input  type={"button"}
                        value={props.t('Buscar')} 
                        className={"home-search-button"}
                        onClick={() => searchProject()}/>
                
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