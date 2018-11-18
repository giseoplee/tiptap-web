import {
    BLAME_LIST
} from '../../constants/action-types';
import blameApi from '../api/BlameApi';

export function getBlameList (params) {
    return dispatch => {
        return go(
            params,
            params => blameApi.getList('api/blame/list', params),
            result => dispatch({
                type: BLAME_LIST,
                payload: result.data.data
            })
        )
    }
}
