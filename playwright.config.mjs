import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
    serviceWorkers: "block",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "pnpm exec http-server . -p 4173 -c-1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true
  },
  projects: [
    { name: "chromium", grep: /@desktop/, use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-touch", grep: /@mobile/, use: { ...devices["Pixel 7"] } }
  ]
});
