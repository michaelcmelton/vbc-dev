import {
    BUSINESS_LOADING,
    BUSINESS_LOADED,
    BUSINESS_LOAD_FAIL
} from '../actions/types';

const initialState = {
    businessList: null,
    isLoading: true
}

export default function(state = initialState, action) {
    switch (action.type) {
        case BUSINESS_LOADED:
            return { businessList: action.payload.data};
        case BUSINESS_LOADING:
            return { ...state, isLoading: true };
        case BUSINESS_LOAD_FAIL:
            return {businessList: null, isLoading: false};
        default:
            return state;
    }
}