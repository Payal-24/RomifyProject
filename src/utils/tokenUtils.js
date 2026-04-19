/**
 * JWT Token Utility Functions
 */

// Token storage keys
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

/**
 * Store JWT token in localStorage
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Get JWT token from localStorage
 * @returns {string|null} - JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Store user data in localStorage
 * @param {object} user - User object to store
 */
export const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null} - User object or null if not found
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all auth data from localStorage
 */
export const clearAuthData = () => {
  removeToken();
  removeUser();
};

/**
 * Decode JWT token (without verification - client-side only)
 * @param {string} token - JWT token to decode
 * @returns {object|null} - Decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

/**
 * Get authorization header with token
 * @param {string} token - JWT token
 * @returns {object} - Authorization header object
 */
export const getAuthHeader = (token) => {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user has valid token
 */
export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};

/**
 * Get time until token expiration in milliseconds
 * @param {string} token - JWT token
 * @returns {number} - Milliseconds until expiration (negative if already expired)
 */
export const getTokenExpirationTime = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return 0;

    const expirationTime = decoded.exp * 1000;
    return expirationTime - Date.now();
  } catch (error) {
    console.error("Error getting token expiration time:", error);
    return 0;
  }
};
