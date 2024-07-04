import axios from 'axios';
import axiosApiInstance from '@/plugins/api';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const data = {
    refreshToken: refresh_token,
  };

  return await axios.post('/auth/refresh-token', data);
};

export const login = async (data) => {
  return await axiosApiInstance.post('/auth/login', data);
};

export const forgotPassword = async (data) => {
  return await axios.post('/auth/forgot-password', data);
};

export const resetPassword = async (token, data) => {
  return await axios.post(`/auth/reset-password?token=${token}`, data);
};

export const verifyToken = async (data) => {
  return await axios.post('/auth/verify-token', data);
};