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
            localStorage.setItem("user", JSON.stringify(existInBack.userName))
            props.history.push("/")
            setTimeout(() => {window.location.reload()}, 3000);
         } else {
            props.history.push({
                pathname: '/registerAuthUser',
                state: {detail: user.email }
            });
            setTimeout(() => {window.location.reload()}, 3000);
         }
      }
      return (
        isAuthenticated && (
        <Fragment>{axios.get('http://localhost:8080/user/IsRegistred/' + user.email)
            .then(res => checkExistUser(res.data))
            .catch(e => console.log(e))}</Fragment>
        )
      );
};
    