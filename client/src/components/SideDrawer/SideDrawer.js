import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';


import './SideDrawer.css'
const SideDrawer = (props) => {
    const auth = useSelector(state => state.auth.isAuthenticated);
    let classes
    if (props.show) {
        classes = 'sidedrawer-nav open'
    } else {
        classes = 'sidedrawer-nav'
    }

    return (
        <div className={classes} onClick={props.drawerClickHandler}>
            <div className="sidedrawer-spacer" />
            <ul className="sidedrawer-menu">
                <li className="sidedrawer-item"><Link to='/'>Home</Link></li>
                <li className="sidedrawer-item"><Link to='/directory'>Directory</Link></li>
                <li className="sidedrawer-item"><Link to='/contact'>Contact</Link></li>
                <li className="sidedrawer-item"><Link to='/about'>About</Link></li>
                {auth ? <li className="sidedrawer-item"><Link to='/profile'>Profile</Link></li> : <li className="sidedrawer-item"><Link to='/login'>Login</Link></li>}
                {auth ? <Logout parent="sideDrawer" /> : null}
            </ul>
            <div className="sidedrawer-copyright">
                <p>&#169; 2020. Veteran Business Connection. Designed and Developed by <a href="https://meltondevelopment.com/">Melton Development</a></p>.
            </div>
        </div>
    );
}

export default SideDrawer;