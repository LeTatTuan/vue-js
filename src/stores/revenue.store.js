import { defineStore } from 'pinia';
import { getRecentTransactions, getStatistics } from '@/services';


export const useRevenueStore = defineStore('revenue', {
  state: () => ({}),
  actions: {
    async fetchStatistics(activeTrials, activeSubs, monthlyRecurringRevenue, revenueData, newCustomers, activeUsers, revenues, projects = null) {
      try {
        await getStatistics(projects).then((res) => {
          const data = res['data']['metadata'];
          activeTrials.value = {
            active_trials: data.active_trials,
            active_trials_formatted: data.active_trials_formatted
          };
          revenues[0].noAttribute = activeTrials.value['active_trials'];
          revenues[0].noAttributeStr = activeTrials.value['active_trials_formatted'];

          activeSubs.value = { active_subs: data.active_subs, active_subs_formatted: data.active_subs_formatted };
          revenues[1].noAttribute = activeSubs.value['active_subs'];
          revenues[1].noAttributeStr = activeSubs.value['active_subs_formatted'];

          monthlyRecurringRevenue.value = { revenue: data.revenue, revenue_formatted: data.revenue_formatted };
          revenues[2].noAttribute = monthlyRecurringRevenue.value['revenue'];
          revenues[2].noAttributeStr = monthlyRecurringRevenue.value['revenue_formatted'];

          revenueData.value = { revenue: data.revenue, revenue_formatted: data.revenue_formatted };
          revenues[3].noAttribute = revenueData.value['revenue'];
          revenues[3].noAttributeStr = revenueData.value['revenue_formatted'];

          newCustomers.value = {
            new_customers: data.new_customers,
            new_customers_formatted: data.new_customers_formatted
          };
          revenues[4].noAttribute = newCustomers.value['new_customers'];
          revenues[4].noAttributeStr = newCustomers.value['new_customers_formatted'];

          activeUsers.value = { active_users: data.active_users, active_users_formatted: data.active_users_formatted };
          revenues[5].noAttribute = activeUsers.value['active_users'];
          revenues[5].noAttributeStr = activeUsers.value['active_users_formatted'];
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchTransactions(transactions, totalPages, totalResults, currentPage) {
      try {
        const res = await getRecentTransactions();
        transactions.value = res['data']['metadata']['data'];
        totalPages.value = res['data']['metadata']['totalPages'];
        totalResults.value = res['data']['metadata']['totalResults'];
        currentPage.value = res['data']['metadata']['page'];
      } catch (error) {
        console.log(error);
      }
    }
  }
});