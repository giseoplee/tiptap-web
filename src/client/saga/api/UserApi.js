import { getMethod, postMethod } from './Http';

export default {
    updateStatus: (endpoint, params) => postMethod(endpoint, params)
}
