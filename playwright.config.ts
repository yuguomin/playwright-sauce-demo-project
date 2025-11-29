import { defineConfig, devices } from "@playwright/test";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default defineConfig({
  // set progress number, default set cores 1/2
  workers: 10,
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests",
  // Run all tests in parallel.
  fullyParallel: true,
  // Reporter to use
  reporter: [
    ['html'], // 用于本地查看
    ['json', { outputFile: 'test-results/jsonReport.json' }], // 用于归档
    ['junit', { outputFile: 'test-results/junitReport.xml' }] // 用于CI
  ],
//   reporter: [["html"], ["allure-playwright"]],
  use: {
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    // Base URL to use in actions like `await page.goto("/")`.
    baseURL: "https://www.saucedemo.com",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  outputDir: "./assets",
  // path to the global setup files.
//   globalSetup: require.resolve("./tests/global-setup"),

  // path to the global teardown files.
//   globalTeardown: require.resolve("./tests/global-teardown"),
});
