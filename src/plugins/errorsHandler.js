import VueNotifications from 'vue-notifications';
import i18n from '../i18n';

export default {
  errors: {
    ERR_SERVICE: i18n.t('notifications.internalError'),
    ERR_BAD_REQUEST: i18n.t('notifications.internalError'),
    ERR_ALREADY_VERIFIED: i18n.t('notifications.alreadyVerified'),
    ERR_PHONE_ALREADY_CONFIRMED: i18n.t('notifications.phoneConfirmed'),
    ERR_SMS_LIMIT_EXCEEDED: i18n.t('notifications.smsLimitExceeded'),
    'ERR_BAD_PARAM:captcha': i18n.t('notifications.failedLogin'),
    'ERR_BAD_PARAM:token': i18n.t('notifications.unsuccessfulOperation'),
    'ERR_BAD_PARAM:currency': i18n.t('notifications.invalidCurrency'),
    'ERR_BAD_PARAM:password': i18n.t('notifications.insecurePassword'),
    'ERR_BAD_PARAM:email': i18n.t('notifications.emailIsRequired'),
    'ERR_BAD_PARAM:terms_agreed': i18n.t('notifications.termsNotAccepted'),
    'ERR_BAD_PARAM:limit': i18n.t('notifications.limit100Exceeded'),
    'ERR_BAD_PARAM:aggregate_by': i18n.t('notifications.invalidPeriod'),
    'ERR_BAD_PARAM:count_values': i18n.t('notifications.limit500Exceeded'),
    'ERR_BAD_PARAM:phoneNumber': i18n.t('notifications.invalidPhoneNumber'),
    'ERR_BAD_PARAM:code': i18n.t('notifications.invalidCode'),
    'ERR_NOT_FOUND:user': i18n.t('notifications.userNotFound'),
    'ERR_NOT_FOUND:token': i18n.t('notifications.unsuccessfulOperation'),
    'ERR_NOT_FOUND:request': i18n.t('notifications.requestDoesNotExists'),
    'ERR_ALREADY_EXISTS:address': i18n.t('notifications.addressExists'),
    'ERR_ALREADY_EXISTS:country': i18n.t('notifications.addressExists'),
    'ERR_ALREADY_EXISTS:request': i18n.t('notifications.requestExists'),
  },

  install(Vue) {
    Vue.prototype.$errors = Vue.errors = {
      handleErrors: (err) => {
        const errTitle = i18n.t('notifications.error');
        const errCode = err.response.data.error;
        const errValue = err.response.data.value;
        const errCodeKey = errValue ? `${errCode}:${errValue}` : errCode;

        return errCodeKey in this.errors
          ? VueNotifications.error({ title: errTitle, message: this.errors[errCodeKey] })
          // if Promise.reject(err) => Uncught in promise?!
          : err;
      },

      isBadJWT: err => err.response.data.error === 'ERR_BAD_JWT',

      isBadToken: err => err.response.data.error === 'ERR_BAD_PARAM'
        && err.response.data.value === 'token',
    };
  },
};
