import React, {Fragment} from 'react'
import {withNamespaces} from 'react-i18next';
import '../styles/SearchBar.css'

function SearchBar({t}) {
    return(
        <Fragment>
            <div className={"home-search-bar"}>
                <input type={"text"} placeholder={t('Buscar')} className={"search-bar"}/>
                <input type={"button"} value={t('Buscar')} className={"home-search-button"}/>
            </div>
        </Fragment>
    );
}


export default withNamespaces()(SearchBar);