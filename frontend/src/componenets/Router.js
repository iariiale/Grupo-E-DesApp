import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ProjectWrapper from "./ProjectWrapper";
import Login from './Login';
import UserProfile from './userProfile';
import ProjectsNearEnd from './ProjectsNearEnd'; 
import AddProject from './AddProject';
import AddLocality from './addLocality';
import CheckUserAuth from './CheckUserAuth';
import RegisterAuthUser from './RegisterAuthUser'
export default function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/checkUser' component={CheckUserAuth} />
                <Route exact path='/registerAuthUser' component={RegisterAuthUser} />
                <Route exact path='/projectWrapper' component={ProjectWrapper}/>
                <Route exact path='/login' component={Login} />
                <Route exact path='/profile' component={UserProfile}/>
                <Route path='/nearEndProjects' component={ProjectsNearEnd} />
                <Route path='/addProject' component={AddProject} />
                <Route path='/addLocality' component={AddLocality} />
                <Route exact path='*' component={Home}/>
            </Switch>
        </BrowserRouter>    
    );
}