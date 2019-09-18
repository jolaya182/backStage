/**
 * title: index.js 
 * 
 * date: 9/18/2019
 * 
 * author:  javier olaya
 * 
 * description: component that handles the main logic for accessing and organizing the wepp app 
 * 
 */

import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

/* define the state properties of the web application */
ReactDom.render((
  <div>
    <App></App>
  </div>
), document.getElementById("app"));