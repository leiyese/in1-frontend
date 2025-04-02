import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/users/create', userData);
        return response.data;
    } catch(error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const getProfile = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}`, {
            withCredentials: true
        });
        return response.data;
    } catch(error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}

export const updateProfile = async (userId, updateData) => {
    try {
        console.log("Sending update request to:", `/users/update/${userId}`);
        console.log("Update data:", updateData);
        
        const response = await axiosInstance.put(`/users/update/${userId}`, updateData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("Update response:", response.data);
        return response.data;
    } catch(error) {
        console.error("Error updating profile:", error);
        console.log("Error details:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });
        throw error;
    }
}