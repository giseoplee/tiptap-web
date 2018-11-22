import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_CLEAR,
    AUTH_LOGOUT,
    AUTH_LOGOUT_COMPLETE,
    SESSION_CHECK,
    SESSION_ALIVE,
    SESSION_EXPIRED,
    RESET_REDIRECT
} from '../constants/action-types';

const initState = {
    redirect: false,
    status: false,
    error: null
};

export const authorize = (account, password) => ({
    type: AUTH_REQUEST,
    payload: { account, password }
});

export const destroyAuthorize = () => ({
    type: AUTH_LOGOUT
});

export const clearAuthorize = () => ({
    type: AUTH_CLEAR
});

export const sessionCheck = () => ({
    type: SESSION_CHECK
});

export const resetRedirect = () => ({
    type: RESET_REDIRECT
});

export default function auth (state = initState, { type, payload }) {
    switch (type){
        case AUTH_SUCCESS: {
            return { ...state, status: true };
        }
        case AUTH_FAILURE: {
            return { ...state, error: payload, status: payload, error: payload };
        }
        case AUTH_LOGOUT_COMPLETE: {
            return { ...state, error: payload, status: false };
        }
        case AUTH_CLEAR: {
            return { ...state, status: false };
        }
        case SESSION_ALIVE: {
            return { ...state, status: true };
        }
        case SESSION_EXPIRED: {
            return { ...state, redirect: true };
        }
        case RESET_REDIRECT: {
            return { ...state, redirect: false };
        }
        default:
            return state;
    }
}
