import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ProjectWrapper from "./ProjectWrapper";
import Login from './Login';
import UserProfile from './userProfile'; 

export default function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/projectWrapper' component={ProjectWrapper}/>
                <Route exact path='/login' component={Login} />
                <Route exact path='/userProfile' componenet={UserProfile} />
                <Route exact path='*' component={UserProfile}/>
            </Switch>
        </BrowserRouter>
    );
}