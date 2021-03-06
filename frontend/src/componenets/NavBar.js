import React, {Fragment} from 'react';
import SearchBar from "./SearchBar";

export default function Navbar(props) {

    let usernmaeOrEmpty = localStorage.getItem("user")
    let value;
    if(usernmaeOrEmpty) {
        value = usernmaeOrEmpty
    }else {
        value = 'Ingresar/Registrarse'
    }

    function goToProfileOrRegister() {
        if(usernmaeOrEmpty) {
            props.history.push('/profile')
        }else {
            props.history.push("/login")
        }
    }
    return(
        <Fragment>
            <input  type={"button"} 
                    value={value} 
                    className={"log-in-home"}
                    onClick={() => goToProfileOrRegister()}/>
            <SearchBar history={props.history} 
                       showProjectsEnd={props.showProjectsEnd}/>
        </Fragment>
    )
}