import axiosApiInstance from '@/plugins/api';

export const getUsersApi = async () => {
  return await axiosApiInstance.get('/admin/user');
};

export const getInfo = async () => {
  return await axiosApiInstance.get('/user/me');
};

export const createUserApi = async (data) => {
  return await axiosApiInstance.post('/admin/user/register', data);
};

export const updateUserApi = async (userId, data) => {
  return await axiosApiInstance.put(`/admin/user/${userId}`, data);
};

export const getUserApi = async (userId) => {
  return await axiosApiInstance.get(`/user/${userId}`);
};