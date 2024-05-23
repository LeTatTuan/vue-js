import { ref } from 'vue';
import { getInfo } from '@/services';

export const authStore = ref({
  user: null,
  isLoggedIn: false,
});

export const initAuthStore = async () => {
  if (localStorage.getItem('access_token')) {
    const { data } = await getInfo();
    authStore.value.user = data.metadata.user;
    authStore.value.isLoggedIn = true;
  }
};
