import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/stores';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        meta: { requiresAuth: true, roles: ['ADMIN'] },
        component: () => import('@/views/UserList.vue'),
      },
    ]
  },
  {
    path: '/users',
    name: 'users',
    meta: { requiresAuth: true, roles: ['ADMIN'] },
    component: () => import('@/views/UserList.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/auth/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('@/views/RegisterPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from);
  const isLoggedIn = localStorage.getItem('access_token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' });
    } else {
      const user = authStore.value.user;
      const userRole = user.role;
      if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        console.log('403');
        next({ name: 'dashboard' });
      }
    }
  } else {
    if (isLoggedIn && to.name === 'login') {
      next({ name: 'dashboard' });
    }
  }
  next();
});
export default router;
