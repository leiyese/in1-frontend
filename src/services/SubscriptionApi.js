import axiosInstance from "./axiosInstance";


const API_BASE_URL = 'http://localhost:5010/subscriptions';


export const fetchSubscriptionTypes = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/get_subscription_types`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription types:', error);
        throw error;
    }
};

/**

 *
 * @param {number|string} subscriptionId 
 * @param {number|string} userId 
 */
export const createUserSubscription = async (subscriptionId, userId) => {
    try {
        const requestData = {
            date: new Date().toISOString(), // Current date in ISO format,
            subscriptions_type_id: subscriptionId,
            user_id: userId,  
        };

        const response = await axiosInstance.post(`${API_BASE_URL}/create_subscription`, {
            data: requestData
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user subscription:', error);
        throw error;
    }
};

