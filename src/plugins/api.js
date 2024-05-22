import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';
import { refreshAccessToken } from '@/services';

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem('access_token');

    config.headers = {
      Authorization: `Bear ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh-token' &&
      originalRequest.url !== 'auth/login'
    ) {
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        localStorage.setItem('access_token', token.accessToken);
        localStorage.setItem('refresh_token', token.refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bear ${token.accessToken}`;
        return axiosApiInstance(originalRequest);
      } catch (error) {
        console.log(error, 'ERROR', originalRequest.url);
        notify({
          type: 'error',
          title: 'Authorization',
          text: 'Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại!',
        });
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
