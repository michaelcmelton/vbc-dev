import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

import './Register.css';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confPassword: '',
        branch: '',
        msg: null
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg : error.msg});
            } else {
                this.setState({msg: null});
            }
        }
        if(this.state.isAuthenticated) {
            return <Redirect to='/profile' />
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const {name, email, password, confPassword, branch} = this.state;
        const newUser = {
            name,
            email,
            password,
            confPassword,
            branch
        }
        this.props.register(newUser);
    }

    render() {
        document.body.style.overflow = 'hidden';
        const imgPath = process.env.PUBLIC_URL + '/img/';

        if(this.props.isAuthenticated) {
            return <Redirect to='/profile'/>
        }

        return (
            <div className='register'>
                <div className="flag-backdrop">
                    <img alt="flag-backdrop" src={imgPath + 'flag.jpg'} />
                    <div className="fillbox" />
                </div>
                <div className="register-form-container">
                    <h1>Register</h1>
                    {this.state.msg ? <h4>{this.state.msg}</h4> : null}
                    <form onSubmit={this.onSubmit}>
                        <input onChange={this.onChange} name="email" type="email" placeholder="example@example.com" />
                        <input onChange={this.onChange} name="name" placeholder="Name" />
                        <select onChange={this.onChange} name="branch">
                            <option value="">Branch of Serivice</option>
                            <option value="Army">Army</option>
                            <option value="Navy">Navy</option>
                            <option value="Marine Corps">Marine Corps</option>
                            <option value="Air Force">Air Force</option>
                            <option value="National Guard">National Guard</option>
                            <option value="Reserves">Reserves</option>
                        </select>
                        <input onChange={this.onChange} name="password" type="password" placeholder="Password" />
                        <input onChange={this.onChange} name="confPassword" type="password" placeholder="Confirm Password" />
                        <div className="button-group">
                            <button>Register</button>
                            <Link to='/'><button type="button">Cancel</button></Link>
                        </div>
                    </form>
                    <button type='button'><Link to='/login'>Already have an account? Click here to sign in.</Link></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);