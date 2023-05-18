import { TOKEN_KEY, ACCESS_TOKEN, UNIX_TIME_TOKEN_EXPIRES, ME } from "./config";
import moment from 'moment';

interface Token {
  access_token: string,
  expires_in: number,
  token_type: string
}

interface User {

}

/**
 * Set token to localStorage
 * @param {Object}
 */
export const setToken = (token: Token): void => {
  if (!token) return;

  const expiresInSeconds = typeof token.expires_in === 'string' ? parseInt(token.expires_in) : token.expires_in;
  
  let tokenTime = new Date().getTime() + expiresInSeconds*1000;
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  window.localStorage.setItem(ACCESS_TOKEN, token.access_token);
  window.localStorage.setItem(UNIX_TIME_TOKEN_EXPIRES, JSON.stringify(tokenTime));
}

/**
 * Get token from localStorage
 */
export const getToken = (): Token | null => {
  let tokenStorage = window.localStorage.getItem(TOKEN_KEY);
  if (!tokenStorage) {
    return null;
  }

  try {
    const token: Token = JSON.parse(tokenStorage)

    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * set user authenticated
 * @param {Object}
 */
export const setAuth = (auth: User): void => {
  if (!auth) return;

  window.localStorage.setItem(ME, JSON.stringify(auth));
}

/**
 * get user authenticated
 */
export const getAuth = (): User | null => {
  const userAuthen = window.localStorage.getItem(ME);
  if (!userAuthen) {
    return null;
  }

  try {
    const user: User = JSON.parse(userAuthen);

    return user
  } catch (err) {
    console.log(err);
    return null
  }
}

/**
 * Remove token to localStorage
 */
export const removeToken = (): void => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(UNIX_TIME_TOKEN_EXPIRES);
  window.localStorage.removeItem(ME);
}

/**
 * check authentication
 */
export const isAuthentication = (): boolean => {
  let tokenStorage = window.localStorage.getItem(TOKEN_KEY);
  let accessToken = window.localStorage.getItem(ACCESS_TOKEN);
  let tokenTime = Number(window.localStorage.getItem(UNIX_TIME_TOKEN_EXPIRES))
  const now = new Date().getTime();

  let jsonToken: Token = {
    access_token: '',
    expires_in: 3600,
    token_type: ''
  }

  if (tokenStorage !== null) {
    jsonToken = JSON.parse(tokenStorage);
  }

  if (!tokenStorage || !accessToken) {
    // Token does not exist
    return false
  }

  if (jsonToken.access_token !== accessToken) {
    return false
  }

  if (tokenTime < now) {
    return false
  } 

  return true
}

