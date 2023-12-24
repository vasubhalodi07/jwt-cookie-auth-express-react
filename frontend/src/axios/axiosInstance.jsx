import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await instance
          .post("/user/refresh", null, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            toast.success(response.data.message);
          })
          .catch((response) => {
            toast.success(response.data.message);
          });

        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
