import {
    BLOCK_LIST,
    GET_BLOCK_SUCCESS,
    GET_BLOCK_FAILURE
} from '../constants/action-types';

const initState = {
    status: 'INIT',
    list: [],
    totalItems: 0,
    pageSize: 0,
    currentPage: 0
}

export const getBlockList = params => ({
    type: BLOCK_LIST,
    payload: params
});

export default function BLOCK (state = initState, { type, payload }) {
    switch (type) {
        case BLOCK_LIST:
            return { ...state, status: 'WAITING' };
        case GET_BLOCK_SUCCESS:
            return { ...state, status: 'SUCCESS', list: payload.datas, totalItems: payload.totalItems, pageSize: payload.pageSize, currentPage: payload.page };
        case GET_BLOCK_FAILURE:
            return { ...state, status: payload.desc };
        default:
            return state;
    }
}
