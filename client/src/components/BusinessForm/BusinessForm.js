import React, { Component } from 'react';
import { connect } from 'react-redux';
import { businessAdd } from '../../actions/businessActions';

import PropTypes from 'prop-types';

import './BusinessForm.css';

class BusinessForm extends Component {
    state = {
        ownerId: this.props.user._id,
        businessName: null,
        city: null,
        state: null,
        industry: null,
        industryOther: null,
        biography: null,
        areasServiced: null,
        phone: null,
        email: null,
        website: null,
        facebook: null,
        instagram: null,
        twitter: null
    }
    static propTypes = {
        businessAdd: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const { ownerId,
            businessName,
            city,
            state,
            industry,
            industryOther,
            biography,
            areasServiced,
            phone,
            email,
            website,
            facebook,
            instagram,
            twitter } = this.state;
        let newBusiness;
        console.log(ownerId);
        if(industry === 'other') { 
            newBusiness = { ownerId,
                businessName,
                city,
                state,
                industry: industryOther,
                biography,
                areasServiced,
                phone,
                email,
                website,
                facebook,
                instagram,
                twitter }
        } else {
            newBusiness = { ownerId,
                businessName,
                city,
                state,
                industry,
                biography,
                areasServiced,
                phone,
                email,
                website,
                facebook,
                instagram,
                twitter }
        }
        this.props.businessAdd(newBusiness);
    }

    render() {
        return (
            <div className="business-form">
                <div className="form-container">
                    <h2>Add Business</h2>
                    <form onSubmit={this.onSubmit}>
                        <h4>General</h4>
                        <input onChange={this.onChange} name="businessName" placeholder="Business Name"></input>
                        <input onChange={this.onChange} name="city" placeholder="City"></input>
                        <input onChange={this.onChange} name="state" placeholder="State" type="state"></input>
                        <select onChange={this.onChange} id="industry" name="industry">
                            <option value="">Select an Industry</option>
                            <option value="other">Other</option>
                        </select>
                        {this.state.industry === 'other' ? <input onChange={this.onChange} name="industryOther" placeholder="Input your industry here"></input> : ''}
                        <textarea onChange={this.onChange} id="bio" rows="10" maxLength="750" name="biography" placeholder="Tell us your business story."></textarea>
                        <div className="bottom-half-form">
                            <div>
                                <h4>Contact Info</h4>
                                <input onChange={this.onChange} name="areasServiced" placeholder="Areas Serviced"></input>
                                <input onChange={this.onChange} name="phone" placeholder="Phone Number"></input>
                                <input onChange={this.onChange} name="email" placeholder="Email"></input>
                                <input onChange={this.onChange} name="website" placeholder="Website"></input>
                            </div>
                            <div>
                                <h4>Social Media</h4>
                                <input onChange={this.onChange} name="facebook" placeholder="Facebook URL"></input>
                                <input onChange={this.onChange} name="instagram" placeholder="Instagram URL"></input>
                                <input onChange={this.onChange} name="twitter" placeholder="Twitter URL"></input>
                            </div>
                        </div>
                        <button>Add Business</button>
                        <button type="button" onClick={this.props.click}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { businessAdd })(BusinessForm);