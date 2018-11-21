import { getMethod, postMethod } from './Http';

export default {
    isLogin: (endpoint, params) => postMethod(endpoint, params),
    isLogout: endpoint => postMethod(endpoint),
    isSessionCheck: endpoint => postMethod(endpoint)
}
