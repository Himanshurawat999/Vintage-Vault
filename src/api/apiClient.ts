import axios from "axios";
import { useAuthStore } from "../store/authStore";

const apiClient = axios.create({
    baseURL: 'https://ds-e-commerce-backend.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default apiClient;