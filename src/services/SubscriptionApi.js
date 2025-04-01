import axiosInstance from "./axiosInstance";

const API_BASE_URL = 'http://localhost:5010/subscriptions';

export const fetchSubscriptionTypes = async () => {
    try {
        const response = await axiosInstance.get(`subscriptions/get_subscription_types`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription types:', error);
        throw error;
    }
};

/**
 * Create or update a user subscription.
 * 
 * @param {number|string} subscriptionId - The subscription type id
 * @param {number|string} userId - The user id
 */
export const createUserSubscription = async (subscriptionId, userId) => {
    try {
        // This endpoint now handles both creating and updating
        const response = await axiosInstance.post(`subscriptions/create_subscription_and_update_user`, {
            subscriptions_type_id: subscriptionId,
            user_id: userId,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating/updating user subscription:', error);
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
        const response = await axiosInstance.delete(`subscriptions/delete_subscription/${subscriptionId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user subscription:', error);
        throw error;
    }
};

export const getUserSubscription = async (userId) => {
    try {
        const response = await axiosInstance.get(`subscriptions/get_user_subscription/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            // Return null if subscription not found (404)
            return null;
        }
        console.error('Error fetching user subscription:', error);
        throw error;
    }
};