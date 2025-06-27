import axios from "axios";

const API_URL = "https://healthmate-dpdpf4dgb2fhdubs.southeastasia-01.azurewebsites.net/api";

const recipeService = {
    getAllRecipe: async () => {
        const response = await axios.get(`${API_URL}/Recipe`);
        return response.data;
    },

    createRecipe: async (newRecipe) => {
        const response = await axios.post(`${API_URL}/Recipe`, newRecipe);
        return response.data;
    },

    deleteRecipe: async (id) => {
        const response = await axios.delete(`${API_URL}/Recipe/${id}`);
        return response.data;
    },

    updateRecipe: async (id, updatedRecipe) => {
        const response = await axios.put(`${API_URL}/Recipe/${id}`, updatedRecipe);
        return response.data;
    },

    getAllCategory: async () => {
        const response = await axios.get(`${API_URL}/Recipe/categories`);
        return response.data;
    },
};

export default recipeService;
