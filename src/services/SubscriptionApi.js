import axiosInstance from "./axiosInstance";

// Adjust this base URL to match your Flask API server's address
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
 * When a user clicks on a subscription plan, call this function
 * to create a subscription linked to that user.
 *
 * @param {number|string} subscriptionId - The ID of the chosen subscription plan.
 * @param {number|string} userId - The ID of the user.
 */
export const createUserSubscription = async (subscriptionId, userId) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/create_subscription`, {
            subscriptions_type_id: subscriptionId,
            user_id: userId,  
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user subscription:', error);
        throw error;
    }
};

/**
 * Example usage in a UI component:
 *
 * const handleSubscriptionClick = async (subscriptionId) => {
 *   try {
 *     // Assuming you have the user's id from your auth context or state.
 *     const userId = getCurrentUserId();
 *     const result = await createUserSubscription(subscriptionId, userId);
 *     // Process the result, e.g., update UI, show confirmation, etc.
 *   } catch (error) {
 *     alert('Failed to create subscription.');
 *   }
 * };
 */