import React from 'react';
import {Link} from 'react-router-dom';

import './SideDrawer.css'
const SideDrawer = (props) => {
    let classes
    if(props.show) {
        classes = 'sidedrawer-nav open'
    } else {
        classes = 'sidedrawer-nav'
    }

    return (
        <div className={classes} onClick={props.drawerClickHandler}>
            <div className="sidedrawer-spacer"/>
            <ul className="sidedrawer-menu">
                <Link to='/'><li className="sidedrawer-item">Home</li></Link>
                <Link to='/profile'><li className="sidedrawer-item">Profile</li></Link>
                <Link to='/directory'><li className="sidedrawer-item">Directory</li></Link>
                <Link to='/contact'><li className="sidedrawer-item">Contact</li></Link>
                <Link to='/about'><li className="sidedrawer-item">About</li></Link>
            </ul>
            <div className="sidedrawer-copyright">
                &#169; 2020. Veteran Business Connection. Designed and Developed by <a href="https://meltondevelopment.com/">Melton Development</a>.
            </div>
        </div>
    );
}

export default SideDrawer;