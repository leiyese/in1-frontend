import axiosInstance from "./axiosInstance";

export const fetchAiResponse = async (model_type, prompt, system) => {
    try {
        const response = await axiosInstance.post('ai/ai_model', {
            model_type, prompt, system,
        });
        return response.data.response;
    } catch (e) {
        console.error("AI API request failed:", e);
        throw new Error('Failed to get response from AI');
    }
};