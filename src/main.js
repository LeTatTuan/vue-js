import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import App from './App.vue';
import './assets/css/tailwind.css';
import './assets/css/global.css';
import Notifications from '@kyvg/vue3-notification';
import authLayout from '@/layouts/authLayout.vue';
import emptyLayout from '@/layouts/emptyLayout.vue';
import { useAuthStore } from '@/stores';


const initApp = async () => {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(router);
  app.use(pinia);
  app.component('DefaultLayout', authLayout);
  app.component('EmptyLayout', emptyLayout);
  app.use(Notifications);
  const auth = useAuthStore();
  await auth.init();
  app.mount('#app');
};
initApp();
