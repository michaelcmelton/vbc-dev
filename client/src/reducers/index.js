import {combineReducers} from 'redux';
import authenticationReducer from './authenticated';
import businessReducer from './business';
import errorReducer from './error';

const rootReducer = combineReducers({
    auth: authenticationReducer,
    business: businessReducer,
    error: errorReducer
})

export default rootReducer;