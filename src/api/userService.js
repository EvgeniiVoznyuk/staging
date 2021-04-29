import removeTrailingSlash from 'remove-trailing-slash';
import service from './service';
import userServiceInterceptors from './interceptors/userServiceInterceptors';

const userService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

service.addRequestInterceptors(userService,
  (config) => {
    userServiceInterceptors.handleUserEnv(config);
    userServiceInterceptors.handleAuthorizationBearer(config);
    return config;
  },
  err => Promise.reject(err));

service.addResponseInterceptors(userService,
  response => response,
  err => userServiceInterceptors.handleRefreshToken(err, userService));

export default {

  register(userData) {
    return userService.post('user/register', userData);
  },

  verifyEmail(token) {
    return userService.post('user/verify', token);
  },

  login(userData) {
    return userService.post('/auth', userData);
  },

  restoreJWT() {
    return userService.get('auth/restore');
  },

  refreshJWT(refreshToken) {
    return userService.post('/auth/refresh', refreshToken);
  },

  logout() {
    return userService.post('/auth/logout');
  },

  resetPassRequest(userData) {
    return userService.post('user/password/reset/request', userData);
  },

  resetPass(userData) {
    return userService.post('user/password/reset', userData);
  },

  getUserData() {
    return userService.get('user/profile');
  },

  getCountries() {
    return userService.get('user/countries');
  },

  getPermissions() {
    return userService.get('user/permissions');
  },

  saveCountry(countryCode) {
    return userService.post('user/country/save', countryCode);
  },

  requestPhoneConfirmation(data) {
    return userService.post('/phone/confirm/request', data);
  },

  confirmPhone(verificationCode) {
    return userService.post('/phone/confirm', verificationCode);
  },

  agreeToDashTerms(bool) {
    return userService.post('/user/agreement/dash', bool);
  },
};
