import {
    BLAME_LIST,
    GET_BLAME_SUCCESS,
    GET_BLAME_FAILURE
} from '../constants/action-types';

const initState = {
    status: 'INIT',
    list: [],
    totalItems: 0,
    pageSize: 0,
    currentPage: 0
}

export const getBlameList = params => ({
    type: BLAME_LIST,
    payload: params
});

export default function blame (state = initState, { type, payload }) {
    switch (type) {
        case BLAME_LIST:
            return { ...state, status: 'WAITING' };
        case GET_BLAME_SUCCESS:
            return { ...state, status: 'SUCCESS', list: payload.datas, totalItems: payload.totalItems, pageSize: payload.pageSize, currentPage: payload.page };
        case GET_BLAME_FAILURE:
            return { ...state, status: payload.desc };
        default:
            return state;
    }
}
