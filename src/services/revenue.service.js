import axiosApiInstance from '@/plugins/api';

export const getActiveTrials = async () => {
  return await axiosApiInstance.get('/revenue/trials/active');
};

export const getActiveSubs = async () => {
  return await axiosApiInstance.get('/revenue/subscriptions/active');
};

export const getNewCustomers = async () => {
  return await axiosApiInstance.get('/revenue/customers/new');
};

export const getActiveUsers = async () => {
  return await axiosApiInstance.get('/revenue/users/active');
};

export const getRevenues = async () => {
  return await axiosApiInstance.get('/revenue/revenues');
};

export const getRecentTransactions = async () => {
  return await axiosApiInstance.get(`/revenue/transactions`);
};
