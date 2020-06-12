import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePass } from '../../actions/authActions';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import BusinessForm from '../BusinessForm/BusinessForm';

class Profile extends Component {
    state = {
        password: '',
        newPassword: '',
        businessModalOpen: false,
        industryOption: null,
        businessList: null
    }

    componentDidMount() {
        fetch('/api/business/')
            .then(res => res.json())
            .then(data => {
                let arr = []
                for (var i = 0; i < data.data.length; i++) {
                    arr.push(data.data[i].industry);
                }
                arr = arr.sort();

                this.setState({ industryOption: arr });
            });
    }

    static propTypes = {
        changePass: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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
        let backdrop, businessForm, businessList;
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />
        }
        
        if (this.props.show) {
            document.body.style.overflowY = 'scroll';
            backdrop = <Backdrop />
            businessForm = <BusinessForm click={this.props.close} industryOption={this.state.industryOption} />
        }

        return (
            <div className="profile">
                {backdrop}
                <h4>User Profile for {this.props.user.name}</h4>
                <div>
                    <div>
                        <h3>Change Password</h3>
                        {this.props.passMsg ? <h5>{this.props.passMsg}</h5> : ''}
                        <form onSubmit={this.onSubmit}>
                            <label>Current Password:</label>
                            <input onChange={this.onChange} name="password" type="password" />
                            <label>New Password:</label>
                            <input onChange={this.onChange} name="newPassword" type="password" />
                            <button>Change Password</button>
                        </form>
                    </div>
                    {businessForm}
                    <div>
                        <h2>Businesses</h2>
                        {businessList}
                        <button onClick={this.props.open}>Add Business</button>
                    </div>
                    <div>
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
    passMsg: state.auth.opMsg
})

export default connect(mapStateToProps, { changePass })(Profile);