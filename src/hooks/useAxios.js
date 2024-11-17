import axios from "axios";
import { useEffect } from "react";
import api from "../api";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

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
        const originalConfig = error.config;

        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const refreshToken = auth?.refreshToken;

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const { accessToken } = response.data;
          setAuth((prev) => ({ ...prev, accessToken }));

          // Retry the original request with the new token
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalConfig);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptors);
      api.interceptors.response.eject(responseInterceptors);
    };
  }, [auth, setAuth]);

  return { api };
};

export default useAxios;
