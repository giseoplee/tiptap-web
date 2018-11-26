import { call, put, takeLatest } from 'redux-saga/effects';
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT,
    AUTH_LOGOUT_COMPLETE,
    SESSION_CHECK,
    SESSION_ALIVE,
    SESSION_EXPIRED,
    BLAME_LIST,
    GET_BLAME_SUCCESS,
    GET_BLAME_FAILURE } from '../constants/action-types';

import AuthApi from './api/AuthApi';
import BlameApi from './api/BlameApi';

function* authorize({ payload: { account, password } }) {
    const options = {
        account: account,
        password: password
    };
    try {
        const { data } = yield call(AuthApi.isLogin, '/api/auth/login', options);
        switch (data.code) {
            case "1000" : yield put({ type: AUTH_SUCCESS, payload: true }); break;
            case "9000" : yield put({ type: AUTH_FAILURE, payload: data.data }); break;
            default : yield put({ type: AUTH_FAILURE, payload: 'Unkown Error' }); break;
        };
    } catch (error) {
        yield put({ type: AUTH_FAILURE, payload: error.message });
    }
}

function* getBlameList({ payload: params }) {
    const { page = 1 } = !!params ? params : {};
    try {
        const { data } = yield call(BlameApi.getList, `/api/blame/list/${page}`);
        switch (data.code) {
            case "1000" : yield put({ type: GET_BLAME_SUCCESS, payload: data.data }); break;
            case "4000" : {
                yield put({ type: AUTH_LOGOUT_COMPLETE, payload: false });
                yield put({ type: SESSION_EXPIRED });
            } break;
            case "9000" : yield put({ type: GET_BLAME_FAILURE, payload: data.data }); break;
            default : yield put({ type: GET_BLAME_FAILURE, payload: 'Unkown Error' }); break;
        };
    } catch (error) {
        yield put({ type: GET_BLAME_FAILURE, payload: error.message });
    }
}

function* destroyAuthorize() {
    try {
        yield call(AuthApi.isLogout, '/api/auth/logout');
        yield put({ type: AUTH_LOGOUT_COMPLETE, payload: false });
        yield put({ type: SESSION_EXPIRED });
    } catch (error) {
        yield put({ type: AUTH_LOGOUT_FAILURE, payload: error.message });
    }
}

function* sessionCheck() {
    try {
        const { data } = yield call(AuthApi.isLogout, '/api/auth/check');
        switch (data.code) {
            case "1000" : yield put({ type: SESSION_ALIVE }); break;
            case "4000" : yield put({ type: SESSION_EXPIRED }); break;
            default : yield put({ type: SESSION_EXPIRED }); break;
        };
    } catch (error) {
        yield put({ type: SESSION_EXPIRED, payload: error.message });
    }
}

function* saga() {
    yield takeLatest(AUTH_REQUEST, authorize);
    yield takeLatest(BLAME_LIST, getBlameList);
    yield takeLatest(AUTH_LOGOUT, destroyAuthorize);
    yield takeLatest(SESSION_CHECK, sessionCheck);
}

export default saga
