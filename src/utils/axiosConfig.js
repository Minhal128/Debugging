import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/`;

const Axios = axios.create({
  baseURL: BASE_URL,
});

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Add a request interceptor to include Authorization header
Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized or Forbidden - Logging out...");

        // Remove token and user session data
        window.localStorage.removeItem("persist:root");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token"); // Remove token

        // Redirect to login page
        window.location.href = "/";
      } else {
        console.error("API Error:", error.response);
      }
    } else {
      console.error("Network or Server Error:", error);
    }

    return Promise.reject(error);
  }
);

export default Axios;
