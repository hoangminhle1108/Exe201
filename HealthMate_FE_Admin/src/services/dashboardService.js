import axios from "axios";

const API_URL = "https://healthmate-dpdpf4dgb2fhdubs.southeastasia-01.azurewebsites.net/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const dashboardService = {
    getOverview: async (startDate, endDate) => {
        const response = await axios.get(
            `${API_URL}/Dashboard/overview`,
            {
                ...getAuthHeaders(),
                params: { startDate, endDate },
            }
        );
        return response.data;
    },

    getUserGrowth: async (startDate, endDate) => {
        const response = await axios.get(
            `${API_URL}/Dashboard/user-grownth`,
            {
                ...getAuthHeaders(),
                params: { startDate, endDate },
            }
        );
        return response.data;
    },

    getRevenueChart: async (startDate, endDate) => {
        const response = await axios.get(
            `${API_URL}/Dashboard/revenue-chart`,
            {
                ...getAuthHeaders(),
                params: { startDate, endDate },
            }
        );
        return response.data;
    },

    getAllTransactions: async () => {
        const response = await axios.get(`${API_URL}/Transaction/all_transactions`, getAuthHeaders());
        return response.data;
    },

    updateStatusToPaid: async ({ transactionId, userId, packageId }) => {
        const payload = { transactionId, userId, packageId };
        const response = await axios.put(`${API_URL}/Transaction/update_status_to_paid`, payload, getAuthHeaders());
        return response.data;
    },

    updateStatusToExpired: async (transactionId) => {
        const response = await axios.put(`${API_URL}/Transaction/update_status_to_expired/${transactionId}`, null, getAuthHeaders());
        return response.data;
    },
};

export default dashboardService;
