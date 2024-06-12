// axiosConfig.js
import axios from "axios";
import { toast } from "react-toastify";

// Set a default base URL
const axiosInstance = axios.create({
  baseURL: "/", // Replace with your API base URL
  // baseURL: "https://axp2333.uta.cloud/", // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const id = localStorage.getItem("id");

    if (id) {
      config.data = config.data || {};
      config.data.id = id;
    }

    return config;
  },
  (error) => {
    // console.log(error);
    if (error.response && error.response.status === 413) {
      toast.error("File size too large");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
