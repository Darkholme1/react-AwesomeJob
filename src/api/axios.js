import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use((req) => {
    if (req.method === 'post') {
     req.data = qs.stringify(req.data);
    }
    return req;
}, (error) => Promise.reject(error));

export default axios