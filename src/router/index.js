import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/stores';

const routes = [
  {
    path: '',
    name: 'dashboard',
    meta: { requiresAuth: true, layout: 'auth' },
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/UserList.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/auth/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('access_token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' });
    } else {
      const user = authStore.value.user;

      // const userRole = user.roles;
      // if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      //   console.log('403');
      //   next({ name: 'dashboard' });
      // }
    }
  } else {
    if (isLoggedIn && to.name === 'login') {
      next({ name: 'dashboard' });
    }
  }
  next();
});
export default router;
