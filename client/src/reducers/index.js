import {combineReducers} from 'redux';
import authenticationReducer from './authenticated';

const rootReducer = combineReducers({
    auth: authenticationReducer
})

export default rootReducer;