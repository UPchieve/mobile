import axios from 'axios';
import { config } from '../../config';

const http = axios.create({
    baseURL: config.baseUrl,
});

http.interceptors.request.use(async (e) => {
    
    //TODO save in asyncstorage
    const { data } = await axios.get<{ csrfToken: string }>(`${config.baseUrl}/api/csrftoken`,)
    e.headers = {
        'x-csrf-token': data.csrfToken,
    }
    return e;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default http;