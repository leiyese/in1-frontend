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
/** 
* Update a user subscription.
* 
* @param {number|string} subscriptionId - The subscription id to update.
* @param {object} updatedData - An object containing the updated fields, e.g. { subscriptions_type_id, date, user_id }
*/
export const updateUserSubscription = async (subscriptionId, updatedData) => {
   try {
       const response = await axiosInstance.put(`${API_BASE_URL}/update_subscription/${subscriptionId}`, {
           data: updatedData
       });
       return response.data;
   } catch (error) {
       console.error('Error updating user subscription:', error);
       throw error;
   }
};

/**
 * Delete a user subscription.
 * 
 * @param {number|string} subscriptionId - The subscription id to delete.
 */
export const deleteUserSubscription = async (subscriptionId) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/delete_subscription/${subscriptionId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user subscription:', error);
        throw error;
    }
};