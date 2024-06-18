import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getProjects = async () => {
    return await axios.get('/projects');
};