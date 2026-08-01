export const COOKIE_CONFIG = {
  SESSION_NAME: 'session',
  REFRESH_NAME: 'refresh_token',
  MAX_AGE: {
    SESSION: 7 * 24 * 60 * 60 * 1000, // 7 days
    REFRESH: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
} as const;
