import React, { Component } from 'react'

import './BusinessDetail.css';

class BusinessDetail extends Component {
    render() {
        return (
            <div className="businessDetail">
                <h1 id="detail-name">{this.props.data.name}</h1>
                <div className="location-div">
                    <h3>Location</h3>
                    <h4>{this.props.data.city}, {this.props.data.state}</h4>
                    <h4>Areas Serviced</h4>
                    <h4>{this.props.data.areasServiced}</h4>
                </div>
                <div className="social-div">
                    <h3>Social Media</h3>
                    <div id="social-links">
                        {this.props.data.facebook ? <a target="_blank" rel="noopener noreferrer" href={this.props.data.facebook}><i className="active fa-3x fab fa-facebook"></i></a> : <i className="inactive fa-3x fab fa-facebook"></i>}
                        {this.props.data.instagram ? <a target="_blank" rel="noopener noreferrer" href={this.props.data.instagram}><i className="active fa-3x fab fa-instagram"></i></a> : <i className="inactive fa-3x fab fa-instagram"></i>}
                        {this.props.data.twitter ? <a target="_blank" rel="noopener noreferrer" href={this.props.data.twitter}><i className="active fa-3x fab fa-twitter"></i></a> : <i className="inactive fa-3x fab fa-twitter"></i>}
                    </div>
                </div>
                <div className="contact-div">
                    <h3>Contact</h3>
                    <h4>phone</h4>
                    <h4>{this.props.data.phone}</h4>
                    <h4>email</h4>
                    <h4>{this.props.data.email}</h4>
                    <h4>website</h4>
                    <h4>{this.props.data.website}</h4>
                </div>
                <div className="bio-div">
                    <h3>About</h3>
                    <p>{this.props.data.biography}</p>
                </div>
            </div>
        )
    }
}

export default BusinessDetail;
