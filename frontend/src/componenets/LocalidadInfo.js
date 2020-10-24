import React, {Fragment} from 'react';
import {withNamespaces} from 'react-i18next';
import '../styles/Localidad.css'

function LocalidadInfo(props){

    return(
        <div className={"box-locality"}>
            <p>{props.t('Descripción')}</p>
            <div>{props.t('Proyecto en la localidad de')} <strong>{props.info.province}</strong></div>
            <div>{props.t('con una cantidad de poblacion de')}</div>
            <div><strong>{props.info.amountOfPopulation}</strong> argentinxs</div>
        </div>
    )
}

export default withNamespaces()(LocalidadInfo);