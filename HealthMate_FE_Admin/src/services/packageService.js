import axios from "axios";

const API_URL = "https://healthmate-dpdpf4dgb2fhdubs.southeastasia-01.azurewebsites.net/api";

const packageService = {
    getAllPackage: async () => {
        const response = await axios.get(`${API_URL}/PremiumPackage`);
        return response.data;
    },
    updatePackage: async (packageId, data) => {
        const response = await axios.put(`${API_URL}/PremiumPackage/${packageId}`, data);
        return response.data;
    },
    createPackage: async (data) => {
        const response = await axios.post(`${API_URL}/PremiumPackage`, data);
        return response.data;
    }
};

export default packageService;
