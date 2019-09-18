/**
 * title: App.js
 * 
 * Date: 9/18/2019
 * 
 * author: javier olaya
 * 
 * description: this component handles the basic routing for the webpage
 */

import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { HomePage, whoops404 } from '../pages';
import pages from '../css/index.scss';

const App = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={HomePage}></Route>
            <Route component={whoops404}></Route>

        </Switch>
    </Router>
);
export default App;