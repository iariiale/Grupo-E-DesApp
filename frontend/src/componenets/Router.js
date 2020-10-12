import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ProjectDetail from "./ProjectDetail";

export default function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/projectDetail' component={ProjectDetail}/>
            </Switch>
        </BrowserRouter>
    );
}