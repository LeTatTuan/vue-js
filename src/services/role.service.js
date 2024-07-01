import axiosApiInstance from '@/plugins/api';

export const getRoles = async () => {
    return await axiosApiInstance.get('/admin/role');
};
