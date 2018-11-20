import {
    BLAME_LIST,
    GET_BLAME_SUCCESS,
    GET_BLAME_FAILURE
} from '../constants/action-types';

const initState = {
    status: 'INIT',
    data: []
}

export const getBlameList = params => ({
    type: BLAME_LIST,
    payload: params
});

export default function blame (state = initState, { type, payload }) {
    switch (type) {
        case GET_BLAME_SUCCESS:
            return { ...state, data: payload.data };
        case GET_BLAME_FAILURE:
            return { ...state, status: payload.desc };
        default:
            return state;
    }
}
