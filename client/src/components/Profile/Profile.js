import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUserBusiness } from '../../actions/businessActions';
import { changePass } from '../../actions/authActions';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import BusinessForm from '../BusinessForm/BusinessForm';
import { wait } from '@testing-library/react';

import './Profile.css';

class Profile extends Component {
    state = {
        password: '',
        newPassword: '',
        businessModalOpen: false,
        industryOption: null,
        businessList: null
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        fetch('/api/business/')
            .then(res => res.json())
            .then(data => {
                let arr = data.data.map(i => i.industry);
                arr = arr.sort();

                this.setState({ industryOption: arr });
            });
        this.props.loadUserBusiness(this.props.user.id).then(data => {
            this.setState({ businessList: this.props.businessList.map(i => { return <li key={i._id}>{i.businessName}</li> }) })
        });
    }

    static propTypes = {
        changePass: PropTypes.func.isRequired,
        loadUserBusiness: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addBusinesstoState = (businessName) => {
        const arr = this.state.industryOption;
        this.setState({ industryOption: [...arr, businessName] });
    }

    onSubmit = e => {
        e.preventDefault();
        const { password, newPassword } = this.state;
        const passwordChange = {
            email: this.props.user.email,
            password,
            newPassword,
        }
        this.props.changePass(passwordChange);
    }

    render() {

        let backdrop, businessForm;
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />
        }

        if (this.props.show) {
            document.body.style.overflowY = 'scroll';
            backdrop = <Backdrop />
            businessForm = <BusinessForm click={this.props.close} industryOption={this.state.industryOption} addBusiness={this.addBusinesstoState} />
        }
        return (
            <div className="profile">
                {backdrop}
                <h4>User Profile for {this.props.user.name}</h4>
                <div className="profile-container">
                    <div className="business-list">
                        <h2>Businesses</h2>
                        <ul>
                            {this.state.businessList}
                        </ul>
                        <button onClick={this.props.open}>Add Business</button>
                    </div>
                    <div className="password-change">
                        <h3>Change Password</h3>
                        {this.props.passMsg ? <h5>{this.props.passMsg}</h5> : ''}
                        <form onSubmit={this.onSubmit}>
                            <label>Current Password:</label>
                            <input onChange={this.onChange} name="password" type="password" />
                            <br />
                            <label>New Password:</label>
                            <input onChange={this.onChange} name="newPassword" type="password" />
                            <br />
                            <button>Change Password</button>
                        </form>
                    </div>
                    {businessForm}
                    <div className="delete-account">
                        <h2>Delete Account</h2>
                        <h3>Click here to delete your account: </h3>
                        <button>Delete Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    user: state.auth.user,
    passMsg: state.auth.opMsg,
    businessList: state.business.userBusinessList
})

export default connect(mapStateToProps, { changePass, loadUserBusiness })(Profile);