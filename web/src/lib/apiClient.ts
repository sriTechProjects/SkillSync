import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token found in localStorage:", token);
    console.log("🛠 Request before attaching headers:", config.url);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header attached:", config.headers.Authorization);
    } else {
      console.warn("⚠️ No token found or headers missing!");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
