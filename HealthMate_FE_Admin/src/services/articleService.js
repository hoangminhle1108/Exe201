import axios from "axios";

const API_URL = 'https://healthmate-dpdpf4dgb2fhdubs.southeastasia-01.azurewebsites.net/api/Article';

// Helper function to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("No token found in localStorage");
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const articleService = {
    getAllArticles: async () => {
        try {
            const response = await axios.get(API_URL, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error("Error fetching all articles:", error);
            throw error;
        }
    },

    createArticle: async (articleData) => {
        try {
            const response = await axios.post(API_URL, articleData, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error("Error creating article:", error);
            throw error;
        }
    },

    getArticleById: async (articleId) => {
        try {
            console.log("Making request to:", `${API_URL}/${articleId}`);
            const response = await axios.get(`${API_URL}/${articleId}`, getAuthHeader());
            console.log("Article API Response:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching article by ID:", error.response || error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
            throw error;
        }
    },

    updateArticle: async (articleId, articleData) => {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${API_URL}/${articleId}`,
            articleData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    }
};

export default articleService; 