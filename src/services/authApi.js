import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
    try {
        const response = await axiosInstance.post('/authenticate/login', userData, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.error("Error while logging in", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.post('/authenticate/logout')
        console.log("Logged out successfully", response);
    } catch (error) {
        console.error("Error while logging out", error);
    }
}