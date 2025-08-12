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
} as const;
