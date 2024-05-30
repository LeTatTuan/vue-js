import axios from 'axios';
import axiosApiInstance from '@/plugins/api';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getActiveTrials = async () => {
    return await axios.get('/payments/trials/active');
};

export const getActiveSubs = async () => {
    return await axiosApiInstance.get('/payments/subscriptions/active');
};

export const getNewCustomers = async () => {
    return await axiosApiInstance.get('/payments/customers/new');
};

export const getActiveUsers = async () => {
    return await axiosApiInstance.get('/payments/users/active');
};

export const getRevenues = async () => {
    return await axiosApiInstance.get('/payments/revenues');
};

export const getRecentTransactions = async () => {
    return await axiosApiInstance.get('/transactions');
};

