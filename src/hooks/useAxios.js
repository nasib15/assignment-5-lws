import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const requestInterceptors = api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor
    const responseInterceptors = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;

            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { accessToken } = response.data.data;

            setAuth((prev) => ({ ...prev, accessToken }));

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh token is expired or invalid, log out the user
            setAuth({});
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptors);
      api.interceptors.response.eject(responseInterceptors);
    };
  }, [auth, navigate, setAuth]);

  return { api };
};

export default useAxios;
