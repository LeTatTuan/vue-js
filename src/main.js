import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';
import './assets/css/tailwind.css';
import './assets/css/global.css';
import Notifications from '@kyvg/vue3-notification';
import { initAuthStore } from '@/stores/auth.store';
import authLayout from '@/layouts/authLayout.vue';
import emptyLayout from '@/layouts/emptyLayout.vue';

const initApp = async () => {
  await initAuthStore();
  const app = createApp(App);
  app.use(router);
  app.component('DefaultLayout', authLayout);
  app.component('EmptyLayout', emptyLayout);
  app.use(Notifications);
  app.mount('#app');
};
initApp();
