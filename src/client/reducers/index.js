import auth from './auth';
import blame from './blame';
import block from './block';
import user from './user';
import { routerReducer } from 'react-router-redux';

import { combineReducers } from 'redux';

export default combineReducers({
    auth: auth,
    blame: blame,
    block: block,
    user: user,
    router : routerReducer
});
