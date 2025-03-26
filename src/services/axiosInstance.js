import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5010",
    timeout: 100000
})

export default axiosInstance