import {
    UPDATE_USER_STATUS,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAILURE,
    UPDATE_USER_STATUS_RESET
} from '../constants/action-types';

const initState = {
    status: 'INIT',
    data: ''
}

export const updateUserStatus = params => ({
    type: UPDATE_USER_STATUS,
    payload: params
});

export const resetUpdateUserStatus = () => ({
    type: UPDATE_USER_STATUS_RESET
});

export default function blame (state = initState, { type, payload }) {
    switch (type) {
        case UPDATE_USER_STATUS:
            return { ...state, status: 'WAITING'};
        case UPDATE_USER_STATUS_SUCCESS:
            return { ...state, status: 'SUCCESS', data: payload };
        case UPDATE_USER_STATUS_FAILURE:
            return { ...state, status: 'FAILURE', data: payload };
        case UPDATE_USER_STATUS_RESET:
            return { ...state, status: 'INIT' };
        default:
            return state;
    }
}
