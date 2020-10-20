import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ProjectWrapper from "./ProjectWrapper";

export default function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/projectWrapper' component={ProjectWrapper}/>
            </Switch>
        </BrowserRouter>
    );
}