import axios from 'axios';
import { returnErrors } from'./errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CHANGE_SUCCESS
} from './types';


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    axios.get('/api/user/token', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'AUTH_FAIL'));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const changePass = ({email, password, newPassword}) => (dispatch, getState) => {
    const body = JSON.stringify({email, password, newPassword});
    axios.post('/api/user/passwordchange', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: CHANGE_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
    })
}

export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
   const body = JSON.stringify({email, password});
   axios.post('/api/user/login', body, config)
   .then(res => {
       dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data
       })
   })
   .catch(err => {
       dispatch(returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL'));
       dispatch({
           type: LOGIN_FAIL
       })
   })
}

export const register = ({name, email, password, confPassword, branch}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    const body = JSON.stringify({name, email, password, confPassword, branch});
    axios.post('/api/user/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}