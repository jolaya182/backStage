/**
 * title: mainMenu.js
 * 
 * Date: 9/18/2019
 * 
 * author: javier olaya
 * 
 * description: this component handles the side navigation menu
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Picture from '../components/Picture';
import pic from '../pictures/profile.png';


const selectStyle = {
    backgroundColor: "white",
    color: "slategray"
}

const MainMenu = () => <nav className="mainMenu">
    <Picture picture={pic} activeStyle={selectStyle}></Picture>
    <NavLink to="/" activeStyle={selectStyle}>[Home]</NavLink>
</nav>

export default MainMenu;