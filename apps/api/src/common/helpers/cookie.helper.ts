import { CookieOptions, Response } from 'express';
import { env } from '../../config';
import { COOKIE_CONFIG } from '../constants';

// Configuration constants

const baseCookieOptions = (): CookieOptions => {
  const isProduction = env.NODE_ENV === 'production';

  return {
    httpOnly: true, // Prevents client-side JS access
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'none' : 'lax', // Cross-site cookies only in production
    path: '/', // Cookie available across entire site
    // domain: isProduction ? env.COOKIE_DOMAIN : undefined, // Uncomment if needed
  };
};

// For session cookies (no expiration)
export const getSessionCookieOptions = (): CookieOptions => ({
  ...baseCookieOptions(),
  // No maxAge - session cookie
});

// For persistent cookies with expiration
export const getPersistentCookieOptions = (
  maxAge: number = COOKIE_CONFIG.MAX_AGE.REFRESH,
): CookieOptions => ({
  ...baseCookieOptions(),
  maxAge,
  expires: new Date(Date.now() + maxAge),
});

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options?: CookieOptions,
): Response => {
  // Ensure secure value handling
  if (typeof value !== 'string') {
    throw new Error('Cookie value must be a string');
  }

  // Merge options with base configuration
  const cookieOptions = {
    ...baseCookieOptions(),
    ...options,
  };

  // Log cookie settings in development for debugging
  if (env.NODE_ENV !== 'production') {
    console.debug(`Setting cookie: ${name}`, {
      options: cookieOptions,
      valueLength: value.length,
    });
  }

  return res.cookie(name, value, cookieOptions);
};

export const clearCookie = (
  res: Response,
  name: string,
  options?: CookieOptions,
): Response => {
  // Clear cookie with same security settings used when setting
  const clearOptions = {
    ...baseCookieOptions(),
    ...options,
    // Ensure these are properly set for clearing
    maxAge: 0,
    expires: new Date(0),
  };

  return res.clearCookie(name, clearOptions);
};

// Convenience methods for common cookies
export const setSessionCookie = (res: Response, value: string): Response =>
  setCookie(res, COOKIE_CONFIG.SESSION_NAME, value, {
    maxAge: COOKIE_CONFIG.MAX_AGE.SESSION,
  });

export const setRefreshCookie = (res: Response, value: string): Response =>
  setCookie(res, COOKIE_CONFIG.REFRESH_NAME, value, {
    maxAge: COOKIE_CONFIG.MAX_AGE.REFRESH,
  });

export const clearSessionCookie = (res: Response): Response =>
  clearCookie(res, COOKIE_CONFIG.SESSION_NAME);

export const clearRefreshCookie = (res: Response): Response =>
  clearCookie(res, COOKIE_CONFIG.REFRESH_NAME);

// Helper to clear all auth cookies
export const clearAllCookies = (res: Response): Response => {
  clearSessionCookie(res);
  clearRefreshCookie(res);
  return res;
};
