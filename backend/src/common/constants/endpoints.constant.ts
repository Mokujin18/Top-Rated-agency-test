export const ENDPOINTS = {
  BASE: '/api',

  USER: {
    BASE: '/user',
    CREATE: '/',
    FIND_MANY: '/',
    FIND_ONE: '/',
    UPDATE: '/:id',
    REMOVE: '/:id',
  },
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    REFRESH: '/refresh',
    LOGOUT: '/logout',
  },

  PRODUCT: {
    BASE: '/product',
    CREATE: '/',
    FIND_MANY: '/',
    FIND_ONE: '/:id',
    UPDATE: '/:id',
    REMOVE: '/:id',
  },
} as const;
