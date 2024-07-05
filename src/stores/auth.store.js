import { checkAdmin, getInfo, login, logout } from '@/services';
import { defineStore } from 'pinia';
import router, { RoutePath } from '@/router';
import { useNotification } from '@kyvg/vue3-notification';

const notification = useNotification();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    isAdmin: false,
  }),
  actions: {
    async login(LoginDto) {
      try {
        await login(LoginDto).then((res) => {
          const data = res['data'];
          localStorage.setItem('access_token', data.metadata['access_token']);
          localStorage.setItem('refresh_token', data.metadata['refresh_token']);
        });
        await this.init();
        router.push(RoutePath.Dashboard);
      } catch (error) {
        notification.notify({
          type: 'error',
          title: 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập',
          text: error.response.data.message,
        });
        console.log(error);
      }
    },

    async init() {
      if (localStorage.getItem('access_token')) {
        const { data } = await getInfo();
        this.user = data.metadata;
        this.isLoggedIn = true;
        const { data: res } = await checkAdmin();
        if (res['metadata']) {
          this.isAdmin = true;
        }
      }
    },

    clear() {
      this.user = undefined;
      this.isLoggedIn = false;
      this.isAdmin = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

    async logout() {
      await logout();
      this.clear();
      router.push(RoutePath.Login);
    },
  },
});
