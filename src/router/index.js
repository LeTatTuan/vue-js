import { createRouter, createWebHistory } from 'vue-router';

export const RoutePrefix = Object.freeze({
  Auth: '/auth',
  Admin: '/admin',
  Default: '',
});

export const RoutePath = Object.freeze({
  Dashboard: RoutePrefix.Default + '/',
  About: RoutePrefix.Default + '/about',
  NotFound: RoutePrefix.Default + '/404',
  SettingAccount: RoutePrefix.Default + '/settings',
  /*******/
  Login: RoutePrefix.Auth + '/login',
  ForgotPassword: RoutePrefix.Auth + '/forgot-password',
  ResetPassword: RoutePrefix.Auth + '/reset-password',

  /*******/
  ManageUsers: RoutePrefix.Admin + '/users',
});

const routes = [
  {
    path: RoutePath.NotFound,
    meta: { layout: 'empty' },
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: RoutePrefix.Default,
    meta: { requiresAuth: true, layout: 'auth' },
    children: [
      {
        path: RoutePath.Dashboard,
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: RoutePath.SettingAccount,
        name: 'settings',
        component: () => import('@/views/404/index.vue'),
      },
    ],
  },
  {
    path: RoutePrefix.Auth,
    meta: { layout: 'empty' },
    children: [
      {
        path: RoutePath.Login,
        name: 'login',
        component: () => import('@/views/authentication/LoginPage.vue'),
      },
      {
        path: RoutePath.ForgotPassword,
        name: 'forgotPassword',
        component: () => import('@/views/authentication/ForgotPasswordPage.vue'),
      },
      {
        path: RoutePath.ResetPassword,
        name: 'resetPassword',
        component: () => import('@/views/authentication/ResetPasswordPage.vue'),
      }
    ]
  },
  {
    path: RoutePrefix.Admin,
    meta: { layout: 'auth', requiresAuth: true },
    children: [
      {
        path: RoutePath.ManageUsers,
        name: 'users',
        component: () => import('@/views/users/ManageUser.vue'),
      },
    ],
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
    }
  } else {
    if (isLoggedIn && to.name === 'login') {
      next({ name: 'dashboard' });
    }
  }
  next();
});
export default router;
