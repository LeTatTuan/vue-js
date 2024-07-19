import { defineStore } from 'pinia';
import { useNotification } from '@kyvg/vue3-notification';
import {
    createUserApi,
    getProjects,
    getRolesApi,
    getStatistics,
    getUserApi,
    getUsersApi,
    updateUserApi
} from '@/services';

const notification = useNotification();

export const useManageUserStore = defineStore('manageUser', {
  state: () => ({}),
  actions: {
    async fetchUsers(users) {
      try {
        const res = await getUsersApi();
        const data = res['data']['metadata'];
        users.value = data.map((item) => {
          const user = {
            name: item.name,
            email: item.email
          };
          return { ...item, user };
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchRoles(roles) {
      try {
        const res = await getRolesApi();
        const data = res['data']['metadata'];
        roles.value = data;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchProjects(projects) {
      try {
        const res = await getProjects();
        projects.value = res['data']['metadata']['projects'];
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUser(id, currentUser) {
      const { data } = await getUserApi(id);
      currentUser.value = data['metadata'];
    },

    async updateUser(currentUser, userData) {
      const functionExcute = currentUser ? updateUserApi(currentUser.value._id, userData) : createUserApi(userData);
      try {
        await functionExcute.then(async (res) => {
          const data = res['data'];
          notification.notify({
            type: 'success',
            title: 'Success',
            text: data['message']
          });
        });
      } catch (error) {
        if (error.response?.data?.message) {
          notification.notify({
            type: 'error',
            title: 'Failed',
            text: error.response.data.message
          });
        }
        console.log(error);
      }
    },

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
    }
  }
});
