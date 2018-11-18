import * as types from '../constants/action-types';
import update from 'react-addons-update';

const initState = {
    list: {
        status: 'INIT',
        data: []
    }
}

export default function blame (state, action) {

    if (typeof state === "undefined") {
        state = initState;
    };

    switch(action.type){
        case types.BLAME_LIST:
            return update(state, {
                list: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.payload}
                }
            });
        default:
            return state;
    }
}
