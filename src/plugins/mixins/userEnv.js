export default {
  methods: {
    $_setUserEnv() {
      if (!localStorage.getItem('userEnv')) {
        localStorage.setItem('userEnv', JSON.stringify({}));
      }
    },
  },
};
