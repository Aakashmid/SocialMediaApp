import axios from 'axios';
import { TOKEN } from './Components/constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(  // modify  requuest before sending ,adding authoriazation token if token exist
    (config) => {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api