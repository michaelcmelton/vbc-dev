import React from 'react';
import {Link} from 'react-router-dom';
import Logout from '../Logout/Logout';

import './Toolbar.css';
import { useSelector } from 'react-redux';

const imgPath = process.env.PUBLIC_URL + '/img/';

const Toolbar = (props) => {    
        const auth = useSelector(state => state.auth.isAuthenticated);


        return (
            <div className="navbar">
                <button className="mobile-button" onClick={props.drawerClickHandler}>
                    <div className="mobile-button-line" />
                    <div className="mobile-button-line" />
                    <div className="mobile-button-line" />
                </button>
                <div className="nav">
                    <ul className="nav-menu">
                        <li><Link to='/'><button className="nav-menu-item">Home</button></Link></li>
                        <li><Link to='/directory'><button className="nav-menu-item">Directory</button></Link></li>
                        <li><Link to='/about'><button className="nav-menu-item">About</button></Link></li>
                        {auth ? <li><Link to='/profile'><button className="nav-menu-item">Profile</button></Link></li> : <li><Link to='/login'><button className="nav-menu-item">Login</button></Link></li>}
                        {auth ? <li><Logout /></li> : null}
                    </ul>
                </div>
                <img src={imgPath + '/VBC.png'} alt="mobile-logo" className="mobile-logo"/>
                <div className="mobile-spacer" />
            </div>
        );
}

export default Toolbar;