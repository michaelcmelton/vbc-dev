import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUserBusiness, businessDelete } from '../../actions/businessActions';
import { changePass, deleteUser, loadUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import BusinessForm from '../BusinessForm/BusinessForm';

import './Profile.css';

class Profile extends Component {
    _isMounted = false;
    state = {
        password: '',
        newPassword: '',
        businessModalOpen: false,
        industryOption: null,
        businessList: null,
        editData: null
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.loadUser().then(data => {
            this.loadData(data);
        })
    }

    deleteAccount = () => {
        this.props.deleteUser(this.props.user.id);
    }

    businessUpdate = () => {
        this.props.loadUserBusiness(this.props.user.id).then(data => {
            this.setState({
                businessList: this.props.businessList.map(i => {
                    return (
                        <li className="business-item" key={i._id}>
                            {i.businessName}
                            <div>
                                <i onClick={() => { this.editBusiness(i._id) }} class="fa fa-2x fa-pencil-square-o edit" aria-hidden="true"></i>
                                <i class="fa fa-2x fa-trash delete" aria-hidden="true"></i>
                            </div>
                        </li>
                    );
                })
            })
            this.setState({ editData: null });
        });
    }

    loadData = (user) => {
        if(this._isMounted) {
        document.body.style.overflowY = 'scroll';
        fetch('/api/business/')
            .then(res => res.json())
            .then(data => {
                let arr = data.data.map(i => i.industry);
                arr = [...new Set(arr.sort())];

                this.setState({ industryOption: arr });
            });
        this.props.loadUserBusiness(user.id).then(data => {
            if (data.data !== 'No Businesses found for user.') {
                this.setState({
                    businessList: data.data.map(i => {
                        return (
                            <li className="business-item" key={i._id}>
                                {i.businessName}
                                <div>
                                    <i onClick={() => { this.editBusiness(i._id) }} className="fa fa-2x fa-pencil-square-o edit" aria-hidden="true"></i>
                                    <i onClick={() => { this.deleteBusiness(i._id) }} className="fa fa-2x fa-trash delete" aria-hidden="true"></i>
                                </div>
                            </li>
                        );
                    })
                })
            } else {
                this.setState({
                    businessList: <li className="business-item" key="default">No Businesses listed for you! Add one below!</li>
                });
            }
        });
    }
}

    static propTypes = {
        changePass: PropTypes.func.isRequired,
        loadUserBusiness: PropTypes.func.isRequired,
        businessDelete: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        loadUser: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addBusinesstoState = (businessName) => {
        const arr = this.state.industryOption;
        let newArr = [...arr, businessName];
        newArr = [...new Set(newArr)];
        this.setState({ industryOption: newArr });
    }

    addBusiness = () => {
        this.setState({ edit: null });
        this.props.open();
    }

    editBusiness = (key) => {
        let businessData = this.props.businessList.find(i => i._id === key);
        this.setState({ edit: businessData });
        this.props.open();
    }

    deleteBusiness = (id) => {
        this.props.businessDelete(id).then(data => {
            this.props.loadUserBusiness(this.props.user.id).then(data => {
                this.setState({
                    businessList: this.props.businessList.map(i => {
                        return (
                            <li className="business-item" key={i._id}>
                                {i.businessName}
                                <div>
                                    <i onClick={() => { this.editBusiness(i._id) }} class="fa fa-2x fa-pencil-square-o edit" aria-hidden="true"></i>
                                    <i onClick={() => { this.deleteBusiness(i._id) }} class="fa fa-2x fa-trash delete" aria-hidden="true"></i>
                                </div>
                            </li>
                        );
                    })
                })
            });
        });
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
            backdrop = <Backdrop />
            businessForm = <BusinessForm updateBusiness={this.businessUpdate} business={this.state.edit} click={this.props.close} industryOption={this.state.industryOption} addBusiness={this.addBusinesstoState} />
        }
        return (
            <div className="profile">
                {backdrop}
                <div className="profile-container">
                    <div className="business-list">
                        <h2>User Businesses</h2>
                        <ul className="user-business">
                            {this.state.businessList}
                        </ul>
                        <button className="business-add" onClick={this.addBusiness}>Add Business</button>
                    </div>
                    <div className="password-change">
                        <h3>Change Password</h3>
                        {this.props.passMsg ? <h5>{this.props.passMsg}</h5> : ''}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Current Password:</label>
                                <input onChange={this.onChange} name="password" type="password" />
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input onChange={this.onChange} name="newPassword" type="password" />
                            </div>
                            <button>Change Password</button>
                        </form>
                    </div>
                    {businessForm}
                    <div className="delete-account">
                        <h2>Delete Account</h2>
                        <h3>Click here to delete your account: </h3>
                        <button className="delete-button" onClick={this.deleteAccount}>Delete Account</button>
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

export default connect(mapStateToProps, { changePass, loadUserBusiness, businessDelete, deleteUser, loadUser })(Profile);