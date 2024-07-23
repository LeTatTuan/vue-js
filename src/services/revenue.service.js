import axiosApiInstance from '@/plugins/api';

export const getStatistics = async (projects = null) => {
  let query = '';
  const keyword = 'project';
  if (projects && projects.length > 0) {
    const projectsForQuery = projects.map((project) => project['keys']['bundle_id']);
    query += `?${keyword}=` + projectsForQuery[0];
    for (let i = 1; i < projectsForQuery.length; i += 1) {
      if (projectsForQuery[i]) {
        query += `&${keyword}=` + projectsForQuery[i];
      }
    }
  }
  return await axiosApiInstance.get(`/revenue/statistics${query}`);
};

export const getRecentTransactions = async () => {
  return await axiosApiInstance.get(`/revenue/transactions`);
};
