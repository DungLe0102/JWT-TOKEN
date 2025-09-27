// src/utils/axios.customize.js
import axios from "axios";

// Tạo instance riêng
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
    withCredentials: true, // nếu dùng cookie/token
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        // Ví dụ: thêm token
        // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (error) => Promise.reject(error)
);

export default instance;
