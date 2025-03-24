import axios from 'axios';

const instance = axios.create({
    baseURL: `${window.location.origin}`,
    withCredentials: true, // Ensure cookies are sent with requests
});

instance.interceptors.request.use(config => {
    // Remove token handling from headers
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
