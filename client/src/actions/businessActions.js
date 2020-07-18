import { tokenConfig } from '../actions/authActions';
import axios from 'axios';
import { BUSINESS_ADD_SUCCESS, BUSINESS_EDIT_FAIL, BUSINESS_ADD_FAIL, BUSINESS_LOADING, BUSINESS_LOADED, BUSINESS_LOAD_FAIL, USER_BUSINESS_LOADED, BUSINESS_DELETE_SUCCESS } from './types';
import { returnErrors } from './errorActions';

export const businessDelete = (id) => (dispatch, getState) => new Promise((resolve, reject) => {
    const body = JSON.stringify({_id: id});

    axios.delete('/api/business/delete', { data: body, headers: tokenConfig(getState).headers })
    .then(res => {
        dispatch({
            type: BUSINESS_DELETE_SUCCESS,
            payload: res.data
        })
        resolve();
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.status, 'BUSINESS_DELETE_FAIL'));
        dispatch({
            type: BUSINESS_ADD_FAIL
        });
    })
});

export const businessAdd = ({ id = null, ownerId,
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
    online,
    nonprofit    }) => (dispatch, getState) => new Promise((resolve, reject) => {

        const body = JSON.stringify({
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
            online,
            nonprofit
        });
        if (id) {
            axios.post(`/api/business/${id}`, body, tokenConfig(getState))
                .then(res => {
                    dispatch({
                        type: BUSINESS_ADD_SUCCESS,
                        payload: res.data
                    })
                    resolve();
                })
                .catch(err => {
                    dispatch(returnErrors(err.response.data.message, err.status, 'BUSINESS_EDIT_FAIL'));
                    dispatch({
                        type: BUSINESS_EDIT_FAIL
                    });
                })
        } else {
            axios.post('/api/business/', body, tokenConfig(getState))
                .then(res => {
                    dispatch({
                        type: BUSINESS_ADD_SUCCESS,
                        payload: res.data
                    })
                    resolve();
                })
                .catch(err => {
                    dispatch(returnErrors(err.response.data.message, err.status, 'BUSINESS_ADD_FAIL'));
                    dispatch({
                        type: BUSINESS_ADD_FAIL
                    });
                })
        }
    });

export const loadUserBusiness = (id) => (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: BUSINESS_LOADING });
    axios.get(`/api/business/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_BUSINESS_LOADED,
                payload: res.data
            });
            resolve(res.data);
        })
});

export const loadBusiness = () => (dispatch) => {
    dispatch({ type: BUSINESS_LOADING });
    axios.get('/api/business/')
        .then(res => {
            dispatch({
                type: BUSINESS_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.status, 'BUSINESS_LOAD_FAIL'));
            dispatch({
                type: BUSINESS_LOAD_FAIL
            });
        })
}