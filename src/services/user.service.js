import axiosApiInstance from '@/plugins/api';

export const getUsersApi = async () => {
  return await axiosApiInstance.get('/admin/user');
};

export const getInfo = async () => {
  return await axiosApiInstance.get('/user/me');
};