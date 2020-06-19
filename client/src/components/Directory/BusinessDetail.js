import React, { Component } from 'react'

import './BusinessDetail.css';

class BusinessDetail extends Component {
  render() {
    return (
      <div className="businessDetail">
        <h1>{this.props.data.name}</h1>
        <h3>Location</h3>
        <h4>City</h4>
        <h4>{this.props.data.city}</h4>
        <h4>State</h4>
        <h4>{this.props.data.state}</h4>
        <h4>Areas Serviced</h4>
        <h4>{this.props.data.areasServiced}</h4>
        <h3>Social Media</h3>
        <h4>Facebook</h4>
        <h4>{this.props.data.facebook ? this.props.data.facebook : ''}</h4>
        <h4>instagram</h4>
        <h4>{this.props.data.instagram ? this.props.data.instagram : ''}</h4>
        <h4>twitter</h4>
        <h4>{this.props.data.twitter ? this.props.data.twitter : ''}</h4>
        <h3>Contact</h3>
        <h4>phone</h4>
        <h4>{this.props.data.phone}</h4>
        <h4>email</h4>
        <h4>{this.props.data.email}</h4>
        <h4>website</h4>
        <h4>{this.props.data.website}</h4>
      </div>
    )
  }
}

export default BusinessDetail;
