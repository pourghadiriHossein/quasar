import { RouteCallback } from '@quasar/app-vite';
import { route } from 'quasar/wrappers';
import { RouteRecordRaw, RouteRecordRedirectOption } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/auth/AuthLayout.vue'),
    redirect: <RouteRecordRedirectOption> route( <RouteCallback> {name:'login'}),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue')
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/dashboard/DashboardLayout.vue'),
    redirect: <RouteRecordRedirectOption> route( <RouteCallback> {name:'index'}),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('pages/dashboard/IndexPage.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('pages/dashboard/SearchPage.vue')
      },
      {
        path: 'myPost',
        name: 'myPost',
        component: () => import('pages/dashboard/MyPostPage.vue')
      },
      {
        path: 'allPost',
        name: 'allPost',
        component: () => import('pages/dashboard/AllPostPage.vue')
      },
      {
        path: 'allUser',
        name: 'allUser',
        component: () => import('pages/dashboard/AllUserPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
