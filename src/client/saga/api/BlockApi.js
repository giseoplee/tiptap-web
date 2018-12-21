import { getMethod, postMethod } from './Http';

export default {
    getList: (endpoint, params) => getMethod(endpoint, params, 'auth-token'),
}
