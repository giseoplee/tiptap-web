import { call, put, takeLatest } from 'redux-saga/effects';
import { 
    AUTH_REQUEST, 
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT,
    AUTH_LOGOUT_COMPLETE,
    BLAME_LIST,
    GET_BLAME_SUCCESS,
    GET_BLAME_FAILURE } from '../constants/action-types';

import AuthApi from './api/AuthApi';
import BlameApi from './api/BlameApi';

function* authorize({ payload: { login, password } }) {
    const options = {
        account: login,
        password: password
    };
    try {
        const { data } = yield call(AuthApi.isLogin, '/api/auth/login', options);
        switch (data.code) {
            case "1000" : {
                localStorage.setItem('token', data.data);
                yield put({ type: AUTH_SUCCESS, payload: true });
            } break;
            case "9000" : yield put({ type: AUTH_FAILURE, payload: data.data }); localStorage.removeItem('token'); break;
            default : yield put({ type: AUTH_FAILURE, payload: 'Unkown Error' }); localStorage.removeItem('token'); break;
        };
    } catch (error) {
        yield put({ type: AUTH_FAILURE, payload: error.message });
        localStorage.removeItem('token');
    }
}

function* getBlameList({ payload: params }) {
    const options = { params };
    try {
        const { data } = yield call(BlameApi.getList, '/api/blame/list', options);
        switch (data.code) {
            case "1000" : yield put({ type: GET_BLAME_SUCCESS, payload: data.data }); break;
            case "9000" : yield put({ type: GET_BLAME_FAILURE, payload: data.data }); break;
            default : yield put({ type: GET_BLAME_FAILURE, payload: 'Unkown Error' }); break;
        };
    } catch (error) {
        yield put({ type: GET_BLAME_FAILURE, payload: error.message });
    }
}

function* clearAuthorize () {
    try {
        localStorage.removeItem('token');
        yield put({ type: AUTH_LOGOUT_COMPLETE, payload: false });
    } catch (error) {
        log(error);
        yield put({ type: AUTH_LOGOUT_FAILURE, payload: error.message });
    }
}

function* saga() {
    yield takeLatest(AUTH_REQUEST, authorize);
    yield takeLatest(BLAME_LIST, getBlameList);
    yield takeLatest(AUTH_LOGOUT, clearAuthorize);
}

export default saga