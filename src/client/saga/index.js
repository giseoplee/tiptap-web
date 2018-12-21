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
    GET_BLAME_FAILURE,
    BLOCK_LIST,
    GET_BLOCK_SUCCESS,
    GET_BLOCK_FAILURE,
    UPDATE_USER_STATUS,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAILURE } from '../constants/action-types';

import AuthApi from './api/AuthApi';
import BlameApi from './api/BlameApi';
import BlockApi from './api/BlockApi';
import UserApi from './api/UserApi';

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

function* updateUserStatus({ payload: params }) {
    const options = {
        id: params.id,
        status: params.status,
        target_user_id: params.target_user_id,
        target_user_token: params.target_user_token,
        content_id: params.content_id
    };
    try {
        const { data } = yield call(UserApi.updateStatus, `/api/blame/user/update`, options);
        switch (data.code) {
            case "1000" : yield put({ type: UPDATE_USER_STATUS_SUCCESS, payload: data.data }); break;
            case "4000" : {
                yield put({ type: AUTH_LOGOUT_COMPLETE, payload: false });
                yield put({ type: SESSION_EXPIRED });
            } break;
            case "9000" : yield put({ type: UPDATE_USER_STATUS_FAILURE, payload: data.data }); break;
            default : yield put({ type: UPDATE_USER_STATUS_FAILURE, payload: 'Unkown Error' }); break;
        };
    } catch (error) {
        yield put({ type: UPDATE_USER_STATUS_FAILURE, payload: error.message });
    }
}

function* getBlockList({ payload: params }) {
    const { page = 1 } = !!params ? params : {};
    try {
        const { data } = yield call(BlockApi.getList, `/api/blame/blocked/list/${page}`);
        switch (data.code) {
            case "1000" : yield put({ type: GET_BLOCK_SUCCESS, payload: data.data }); break;
            case "4000" : {
                yield put({ type: AUTH_LOGOUT_COMPLETE, payload: false });
                yield put({ type: SESSION_EXPIRED });
            } break;
            case "9000" : yield put({ type: GET_BLOCK_FAILURE, payload: data.data }); break;
            default : yield put({ type: GET_BLOCK_FAILURE, payload: 'Unkown Error' }); break;
        };
    } catch (error) {
        yield put({ type: GET_BLOCK_FAILURE, payload: error.message });
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
    yield takeLatest(BLOCK_LIST, getBlockList);
    yield takeLatest(UPDATE_USER_STATUS, updateUserStatus);
    yield takeLatest(AUTH_LOGOUT, destroyAuthorize);
    yield takeLatest(SESSION_CHECK, sessionCheck);
}

export default saga
