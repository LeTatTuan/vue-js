import { defineStore } from 'pinia';
import { useNotification } from '@kyvg/vue3-notification';
import { createUserApi, getProjects, getRolesApi, getUserApi, getUsersApi, updateUserApi } from '@/services';

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
        roles.value = res['data']['metadata'];
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
      const functionExcute = currentUser.value ? updateUserApi(currentUser.value._id, userData) : createUserApi(userData);
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
    }
  }
});
