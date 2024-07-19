import axiosApiInstance from '@/plugins/api';

export const getStatistics = async (projects = null) => {
  if (projects) {

  }
  return await axiosApiInstance.get('/revenue/statistics');
};

export const getRecentTransactions = async () => {
  return await axiosApiInstance.get(`/revenue/transactions`);
};
