import axiosApiInstance from '@/plugins/api';

export const getRolesApi = async () => {
    return await axiosApiInstance.get('/admin/role');
};
