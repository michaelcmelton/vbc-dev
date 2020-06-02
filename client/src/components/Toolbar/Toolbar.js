import React from 'react';

import './Toolbar.css';

// const imgPath = process.env.PUBLIC_URL + '/img/';

const Toolbar = (props) => {

        return (
            <div className="navbar">
                <button className="mobile-button">
                    <div className="mobile-button-line" />
                    <div className="mobile-button-line" />
                    <div className="mobile-button-line" />
                </button>
                <div className="nav">
                    <ul className="nav-menu">
                        <button className="nav-menu-item">Home</button>
                        <button className="nav-menu-item">Profile</button>
                        <button className="nav-menu-item">Directory</button>
                        <button className="nav-menu-item">FAQ</button>
                        <button className="nav-menu-item">Contact</button>
                        <button className="nav-menu-item">About</button>
                    </ul>
                </div>
            </div>
        );
}

export default Toolbar;