import axiosApiInstance from '@/plugins/api';

export const getProjects = async () => {
    return await axiosApiInstance.get('/project/name');
};