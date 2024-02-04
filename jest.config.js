module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'vue'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.js$': 'babel-jest'
    },
    testMatch: ['**/tests/*.spec.js'],
  };
  