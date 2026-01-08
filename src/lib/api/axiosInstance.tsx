import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    timeout: 10000,
});

// Request Interceptor – Add Bearer Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Response Interceptor (handle 401)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error) {
            toast.error(`${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
