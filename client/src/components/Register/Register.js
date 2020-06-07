import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

const Login = (props) => {
    document.body.style.overflow = 'hidden';
    const imgPath = process.env.PUBLIC_URL + '/img/';

    return (
        <div className='register'>
            <div className="flag-backdrop">
                <img alt="flag-backdrop" src={imgPath + 'flag.jpg'} />
                <div className="fillbox" />
            </div>
            <div className="register-form-container">
                <h1>Register</h1>
                <form>
                    <input name="email" type="email" pattern="[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}" placeholder="example@example.com" />
                    <input name="name" placeholder="Name" />
                    <select name="branch">
                        <option value="">Branch of Serivice</option>
                        <option value="Army">Army</option>
                        <option value="Navy">Navy</option>
                        <option value="Marine Corps">Marine Corps</option>
                        <option value="Air Force">Air Force</option>
                        <option value="National Guard">National Guard</option>
                        <option value="Reserves">Reserves</option>
                    </select>
                    <input name="password" type="password" placeholder="Password" />
                    <input name="confPassword" type="password" placeholder="Confirm Password" />
                    <div className="button-group">
                        <button type="submit">Register</button>
                        <Link to='/'><button type="button" onClick="form.c">Cancel</button></Link>
                    </div>
                </form>
                <button type='button'><Link to='/login'>Already have an account? Click here to sign in.</Link></button>
            </div>
        </div>
    )
}

export default Login;