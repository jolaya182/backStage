/**
 * title: index.js
 * 
 * Date: 9/18/2019
 * 
 * author: javier olaya
 * 
 * description: this component handles the view components for the webpage
 */

import React from 'react';
import MainMenu from './mainMenu';
import pages from '../css/index.scss';


export const whoops404 = () =><div className="whoops404">
    <h1>resources not found at {location.pathname}</h1>
</div>

const PageTemplate = ({children}) =><div className="page">
    <MainMenu></MainMenu>
    {children}
</div>

export const HomePage = () =><div>
    <PageTemplate>
        <div>
            <section className="homePage">
                <h1>HomePage</h1>
            </section>
        </div>
    </PageTemplateF>
</div>
