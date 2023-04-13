const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "wn1s95",
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
