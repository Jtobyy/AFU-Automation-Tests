const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1200,  // Set the width to 1200px
    pageLoadTimeout: 1200000, // Increase page load timeout to 60 seconds
    defaultCommandTimeout: 20000,
    watchForFileChanges: false,
    baseUrl: "https://auditfu.rivetsoftware.ng"
  },
});
