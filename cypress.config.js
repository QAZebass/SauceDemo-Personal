const { defineConfig } = require("cypress");

module.exports = defineConfig({
projectId: "4ctxh6",
viewportWidth: 1000,
viewportHeight: 660,
watchForFileChanges: false,
chromeWebSecurity: false,
	// multi-reporters: one report.xml + mochawesome.json per file.
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'jsconfig.json',
	},
	retries: 1,
	video: false,
	// E2E Testing runner
	e2e: {
		// Glob pattern to determine what test files to load:
		specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx,}'],
		baseUrl: 'https://www.saucedemo.com/',
		watchForFileChanges:false
	},
});
