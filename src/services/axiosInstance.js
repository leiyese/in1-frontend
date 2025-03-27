import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5010',
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;