import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = (props) => {
    document.body.style.overflow = 'hidden';
    const imgPath = process.env.PUBLIC_URL + '/img/';

    return (
        <div className='login'>
            <div className="flag-backdrop">
                <img alt="flag-backdrop" src={imgPath + 'flag.jpg'} />
                <div className="fillbox" />
            </div>
            <div className="form-container">
                <h1>Login</h1>
                <form>
                    <input name="email" type="email" pattern="[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}" placeholder="example@example.com" />
                    <input name="password" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    <div className="button-group">
                        <button type="submit">Login</button>
                        <Link to='/'><button type="button" onClick="form.c">Cancel</button></Link>
                    </div>
                </form>
                <button type='button'><Link to='/register'>Don't have an account? Click here to create one.</Link></button>
            </div>
        </div>
    )
}

export default Login;