import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './componenets/Router';
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorker from './serviceWorker';
import './i18n';

const uri='http://localhost:3000/checkUser/';
ReactDOM.render(
  <Auth0Provider
  domain="desarollo.us.auth0.com"
  clientId="JjWgSjVRNO0sKL7IDn1vQMTuNwkafiGF"
  redirectUri={uri}
>
    <Router />
  </Auth0Provider>,
  document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
