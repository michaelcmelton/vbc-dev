import React, { Component } from 'react';
import { connect } from 'react-redux';
import { businessAdd } from '../../actions/businessActions';

import PropTypes from 'prop-types';

import './BusinessForm.css';

class BusinessForm extends Component {
    constructor(props) {
        super(props);
        if (props.business) {
            this.state = {
                id: props.business._id,
                ownerId: props.user.id,
                businessName: props.business.businessName,
                city: props.business.city,
                stateSelect: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'U.S. Virgin Islands','Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
                state: props.business.state,
                industry: props.business.industry,
                industryOther: props.business.industryOther,
                biography: props.business.biography,
                areasServiced: props.business.areasServiced,
                phone: props.business.phone,
                email: props.business.email,
                website: props.business.website,
                facebook: props.business.facebook,
                instagram: props.business.instagram,
                twitter: props.business.twitter,
                online: props.business.online,
                nonprofit: props.business.nonprofit,
                industryOption: null,
                msg: null
            }
        } else {
            this.state = {
                id: null,
                ownerId: props.user.id,
                businessName: null,
                city: null,
                stateSelect: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'U.S. Virgin Islands','Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
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
                twitter: null,
                industryOption: null,
                online: null,
                nonprofit: null,
                msg: null
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'BUSINESS_ADD_FAIL' || error.id === 'BUSINESS_EDIT_FAIL') {
                this.setState({ msg: error.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    static propTypes = {
        businessAdd: PropTypes.func.isRequired
    }

    checkboxChange = e => {
        this.setState({[e.target.name]: e.target.checked });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.id) {
            const {
                id,
                ownerId,
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
                twitter,
                nonprofit,
                online
            } = this.state;
            let editBusiness;
            if (industry === 'other') {
                editBusiness = {
                    id,
                    ownerId,
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
                    twitter,
                    nonprofit,
                    online
                }
            } else {
                editBusiness = {
                    id,
                    ownerId,
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
                    twitter,
                    nonprofit,
                    online
                }
            }

            this.props.businessAdd(editBusiness).then(
                data => {
                    this.props.updateBusiness();
                    this.props.click();
                });
        } else {
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
                twitter,
                nonprofit,
                online } = this.state;
            let newBusiness;
            if (industry === 'other') {
                newBusiness = {
                    ownerId,
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
                    twitter,
                    nonprofit,
                    online
                }
            } else {
                newBusiness = {
                    ownerId,
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
                    twitter,
                    nonprofit,
                    online
                }
            }
            this.props.businessAdd(newBusiness).then(
                data => {
                    this.props.updateBusiness();
                    this.props.click();
                });
        }
    }

    render() {
       let stateOptions = this.state.stateSelect.map((state, index) => <option key={index + state} value={state}>{state}</option>);
        let optionValues = this.props.industryOption.map((industry, index) => <option key={index} value={industry}>{industry}</option>);
        return (
            <div className="business-form">
                <div className="form-container">
                    <h2>{this.state.id ? 'Edit Business' : 'List a Business'}</h2>
                    {this.state.msg ? <h4>{this.state.msg}</h4> : <br />}
                    <form onSubmit={this.onSubmit}>
                        <h4>General</h4>
                        <input className="general-input" onChange={this.onChange} name="businessName" placeholder="Business Name" value={this.state.businessName ? this.state.businessName : ''}></input>
                        <input className="general-input" onChange={this.onChange} name="city" placeholder="City" value={this.state.city ? this.state.city : ''}></input>
                        <select className="general-input" onChange={this.onChange} name="state" placeholder="State" type="state" value={this.state.state ? this.state.state : ''}>
                            <option value="">Select a State</option>
                            {stateOptions}
                        </select>
                        <select className="general-input" onChange={this.onChange} id="industry" name="industry" value={this.state.industry ? this.state.industry : ''}>
                            <option value="">Select an Industry</option>
                            {optionValues}
                            <option value="other">Select this option to put in your own industry.</option>
                        </select>
                        {this.state.industry === 'other' ? <input id="other-input" onChange={this.onChange} name="industryOther" placeholder="Input your industry here"></input> : ''}
                        <div className="checkbox-wrapper">
                        <input className="checkbox-input" type="checkbox" onChange={this.checkboxChange} name="online" checked={this.state.online ? this.state.online : false}></input>
                        <h4>Online Business?</h4>
                        </div>
                        <br/>
                        <div className="checkbox-wrapper">
                        <input className="checkbox-input" type="checkbox" onChange={this.checkboxChange} name="nonprofit" checked={this.state.nonprofit ? this.state.nonprofit : false}></input>
                        <h4>Nonprofit Business?</h4>
                        </div>
                        <textarea className="general-input" onChange={this.onChange} id="bio" rows="10" maxLength="750" name="biography" placeholder="Tell us what your business provides, and how it all started!" value={this.state.biography ? this.state.biography : ''}></textarea>
                        <div className="bottom-half-form">
                            <div>
                                <h4>Contact Info</h4>
                                <input onChange={this.onChange} name="areasServiced" placeholder="Areas Serviced" value={this.state.areasServiced ? this.state.areasServiced : ''}></input>
                                <input onChange={this.onChange} name="phone" placeholder="Phone Number (1234567890)" value={this.state.phone ? this.state.phone : ''}></input>
                                <input onChange={this.onChange} name="email" placeholder="Email" value={this.state.email ? this.state.email : ''}></input>
                                <input onChange={this.onChange} name="website" placeholder="Website (https://veteranbusinessconnection.org/)" value={this.state.website ? this.state.website : ''}></input>
                            </div>
                            <div>
                                <h4>Social Media</h4>
                                <input onChange={this.onChange} name="facebook" placeholder="Facebook URL (https://facebook.com/veteranbusinessconnection)" value={this.state.facebook ? this.state.facebook : ''}></input>
                                <input onChange={this.onChange} name="instagram" placeholder="Instagram URL (https://instagram.com/veteranbusinessconnection)" value={this.state.instagram ? this.state.instagram : ''}></input>
                                <input onChange={this.onChange} name="twitter" placeholder="Twitter URL (https://twitter.com/veteranbusinessconnection)" value={this.state.twitter ? this.state.twitter : ''}></input>
                            </div>
                        </div>
                        <button>{this.state.id ? 'Save Changes' : 'Add Business'}</button>
                        <button type="button" onClick={this.props.click}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

BusinessForm.defaultProps = {

}

const mapStateToProps = state => ({
    error: state.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { businessAdd })(BusinessForm);