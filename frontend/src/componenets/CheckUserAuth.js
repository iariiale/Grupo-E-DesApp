import React, { Fragment, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

export default function CheckUserAuth(props) {

    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
      }

      function checkExistUser(existInBack) {
         if(existInBack) {
             console.log("ASHUDA POR FAVOR")
            let userString = JSON.stringify(existInBack)
            localStorage.setItem("user", userString)
            props.history.push("/")
            setTimeout(() => {window.location.reload()}, 3000);
         } else {

         }
      }
      return (
        isAuthenticated && (
        <Fragment>{console.log(user)}{axios.get('http://localhost:8080/user/IsRegistred/' + user.email)
            .then(res => checkExistUser(res.data))
            .catch(e => console.log(e))}</Fragment>
        )
      );
};
    