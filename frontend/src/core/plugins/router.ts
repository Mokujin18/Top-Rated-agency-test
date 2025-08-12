import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteRecordRaw,
} from 'vue-router';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@common/constants';

export const redirectToPublicPage: any = (next: NavigationGuardNext) => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || '{}');
  const { tokens } = data;
  if (!tokens?.accessToken) {
    next(ROUTES.LOGIN);
  } else {
    next();
  }
};

export const redirectToPrivatePage: any = (next: NavigationGuardNext) => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || '{}');
  const { tokens } = data;
  if (tokens?.accessToken) {
    next(ROUTES.HOME);
  } else {
    next();
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.LOGIN,
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../../modules/auth/pages/login/LoginPage.vue'),
    beforeEnter: (_, __, next) => {
      redirectToPrivatePage(next);
    },
  },
  {
    path: ROUTES.REGISTERATION,
    name: 'registeration',
    component: () =>
      import(
        /* webpackChunkName: "Login" */ '../../modules/auth/pages/registration/RegistrationPage.vue'
      ),
    beforeEnter: (_, __, next) => {
      redirectToPrivatePage(next);
    },
  },
  {
    path: ROUTES.HOME,
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../../modules/home/HomePage.vue'),
    beforeEnter: (_, __, next) => {
      redirectToPublicPage(next);
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
