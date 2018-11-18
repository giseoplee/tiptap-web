import auth from './auth';
import blame from './blame';

import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    blame
});
