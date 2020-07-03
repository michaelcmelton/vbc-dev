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
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    opMsg: null,
    firstLogin: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING: 
            return {...state, isLoading: true};
        case USER_LOADED: 
            return {...state, isAuthenticated: true, user: action.payload, isLoading: false};
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                firstLogin: false
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                firstLogin: true
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR: 
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                opMsg: null
            }
        case CHANGE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                opMsg: action.payload.msg
            }
        default: 
            return state;
    }
}