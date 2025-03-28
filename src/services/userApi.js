import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
    try{
        const response = await axiosInstance.post('/users/create', userData)
        return response.data
    } catch(error){
        console.error("Error registering user:", error)
        throw error
    }
}