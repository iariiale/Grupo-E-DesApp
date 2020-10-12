import React, {Fragment} from 'react'
import {withNamespaces} from 'react-i18next';

function ProjectDetail(props) {
    return(
        <div>
            {console.log(props.location.state)}
        </div>
    )
}

export default withNamespaces()(ProjectDetail);