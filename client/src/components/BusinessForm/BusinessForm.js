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
                industryOption: null,
                msg: null
            }
        } else {
            this.state = {
                id: null,
                ownerId: props.user.id,
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
                twitter: null,
                industryOption: null,
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
                twitter } = this.state;
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
                    twitter
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
                    twitter
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
                twitter } = this.state;
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
                    twitter
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
                    twitter
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
        console.log(this.props);
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
                        <input className="general-input" onChange={this.onChange} name="state" placeholder="State" type="state" value={this.state.state ? this.state.state : ''}></input>
                        <select className="general-input" onChange={this.onChange} id="industry" name="industry" value={this.state.industry ? this.state.industry : ''}>
                            <option value="">Select an Industry</option>
                            {optionValues}
                            <option value="other">Other</option>
                        </select>
                        {this.state.industry === 'other' ? <input onChange={this.onChange} name="industryOther" placeholder="Input your industry here"></input> : ''}
                        <textarea className="general-input" onChange={this.onChange} id="bio" rows="10" maxLength="750" name="biography" placeholder="Tell us what your business provides, and how it all started!" value={this.state.biography ? this.state.biography : ''}></textarea>
                        <div className="bottom-half-form">
                            <div>
                                <h4>Contact Info</h4>
                                <input onChange={this.onChange} name="areasServiced" placeholder="Areas Serviced" value={this.state.areasServiced ? this.state.areasServiced : ''}></input>
                                <input onChange={this.onChange} name="phone" placeholder="Phone Number" value={this.state.phone ? this.state.phone : ''}></input>
                                <input onChange={this.onChange} name="email" placeholder="Email" value={this.state.email ? this.state.email : ''}></input>
                                <input onChange={this.onChange} name="website" placeholder="Website" value={this.state.website ? this.state.website : ''}></input>
                            </div>
                            <div>
                                <h4>Social Media</h4>
                                <input onChange={this.onChange} name="facebook" placeholder="Facebook URL" value={this.state.facebook ? this.state.facebook : ''}></input>
                                <input onChange={this.onChange} name="instagram" placeholder="Instagram URL" value={this.state.instagram ? this.state.instagram : ''}></input>
                                <input onChange={this.onChange} name="twitter" placeholder="Twitter URL" value={this.state.twitter ? this.state.twitter : ''}></input>
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