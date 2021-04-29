export default {
  methods: {
    $_generateCookieUuid() {
      let cookieUuid = this.$cookie.get('cookie_uuid');
      if (cookieUuid === null) {
        const date = new Date();
        date.setDate(date.getDate() + (365 * 2));
        cookieUuid = this.$uuid();
        cookieUuid = `${cookieUuid}&${new Date(date).getTime()}`;
        this.$cookie.set('cookie_uuid', cookieUuid, { expires: date });
      }
    },
  },
};
