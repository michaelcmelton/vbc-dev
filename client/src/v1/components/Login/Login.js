import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

import './Login.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL' || error.id === 'AUTH_FAIL') {
                this.setState({msg : error.msg});
            } else {
                this.setState({msg: null});
            }
        }
        if(this.state.isAuthenticated) {
            return <Redirect to='/profile' />
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        const newUser = {
            email,
            password,
        }
        this.props.login(newUser);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
    document.body.style.overflow = 'hidden';
    const imgPath = process.env.PUBLIC_URL + '/img/';

    if(this.props.isAuthenticated) {
        return <Redirect to='/profile'/>
    }

    return (
        <div className='login'>
            <div className="flag-backdrop">
                <img alt="flag-backdrop" src={imgPath + 'flag.jpg'} />
                <div className="fillbox" />
            </div>
            <div className="login-form-container">
                <h1>Login</h1>
                {this.state.msg ? <h4 className="error-msg">{this.state.msg}</h4> : <br/>}
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} name="email" type="email" placeholder="example@example.com" />
                    <input onChange={this.onChange} name="password" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    <div className="button-group">
                        <button>Login</button>
                        <Link to='/'><button type="button">Cancel</button></Link>
                    </div>
                </form>
                <button id='register-link' type='button'><Link to='/register'>Don't have an account?</Link></button>
            </div>
        </div>
    )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);