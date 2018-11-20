import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT,
    AUTH_LOGOUT_COMPLETE
} from '../constants/action-types';

const initState = {
    status: false,
    token: localStorage.getItem('token'),
    error: null
};

export const authorize = (login, password) => ({
    type: AUTH_REQUEST,
    payload: { login, password }
});

export const clearAuthorize = () => ({
    type: AUTH_LOGOUT
});

export default function auth (state = initState, { type, payload }) {
    log(type);
    switch (type){
        case AUTH_SUCCESS: {
            return { ...state, token: payload, status: true, token: 'ABC' };
        }
        case AUTH_FAILURE: {
            return { ...state, error: payload, status: payload, error: payload };
        }
        case AUTH_LOGOUT_COMPLETE: {
            return { ...state, error: payload, status: false };
        }
        default:
            return state;
    }
}
