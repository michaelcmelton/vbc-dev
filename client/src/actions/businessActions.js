import { tokenConfig } from '../actions/authActions';
import axios from 'axios';
import { BUSINESS_ADD_SUCCESS, BUSINESS_ADD_FAIL, BUSINESS_LOADING, BUSINESS_LOADED, BUSINESS_LOAD_FAIL } from './types';
import { returnErrors } from './errorActions';

export const businessAdd = ({ ownerId,
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
    twitter }) => (dispatch, getState) => {
        console.log(ownerId)
        const body = JSON.stringify({
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
            twitter
        });
        axios.post('/api/business/', body, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: BUSINESS_ADD_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data.message, err.status, 'BUSINESS_ADD_FAIL'));
                dispatch({
                    type: BUSINESS_ADD_FAIL
                });
            })
    };

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