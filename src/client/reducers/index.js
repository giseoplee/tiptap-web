import auth from './auth';
import blame from './blame';
import { routerReducer } from 'react-router-redux';

import { combineReducers } from 'redux';

export default combineReducers({
    auth: auth,
    blame: blame,
    router : routerReducer
});
