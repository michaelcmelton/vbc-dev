import {combineReducers} from 'redux';
import authenticationReducer from './authenticated';
import errorReducer from './error';

const rootReducer = combineReducers({
    auth: authenticationReducer,
    error: errorReducer
})

export default rootReducer;