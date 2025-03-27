import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5010',
    timeout: 60000,
});

export default axiosInstance;