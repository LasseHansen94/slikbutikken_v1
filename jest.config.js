module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'vue'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',   // vi konverterer vue filer til et format jest kan læse
      '^.+\\.js$': 'babel-jest'
    },
    testMatch: ['**/tests/*.spec.js'],   // Her ligger alle test filer
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
   },
  };
  