import axios from 'axios';
import { config } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const csrfStorage = 'x-csrf-token';
const http = axios.create({
    baseURL: config.baseUrl,
});

const getCsrfToken = async (): Promise<string> => {
    const { data } = await axios.get<{ csrfToken: string }>(`${config.baseUrl}/api/csrftoken`,)
    return data.csrfToken;
}

http.interceptors.request.use(async (e) => {
    let csrfToken: string = '';
    try {
        const value = await AsyncStorage.getItem(csrfStorage);
        if(value !== null){
            csrfToken = value;
        } else {
            console.log('csrf');
            
            csrfToken = await getCsrfToken();
            AsyncStorage.setItem(csrfStorage, csrfToken);
        }
    } catch (error) {

    }

    e.headers = {
        'x-csrf-token': csrfToken,
    }
    return e;
}, function (error) {
    return Promise.reject(error);
});

export default http;