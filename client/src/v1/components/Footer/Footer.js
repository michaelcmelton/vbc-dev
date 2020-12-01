import React, { Component } from 'react';

import './Footer.css';
class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <h4><a style={{'fontSize': 14 + 'px'}} href="/#contact">Contact Us</a> &#169; 2020. Veteran Business Connection. Designed and Developed by <a href="https://meltondevelopment.com/">Melton Development</a>.</h4>
            </div>
        );
    }
}

export default Footer;