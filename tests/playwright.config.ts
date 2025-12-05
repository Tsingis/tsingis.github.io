import { type PlaywrightTestConfig, type ViewportSize } from "@playwright/test";
import { devices } from "playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:3333";
const viewPort: ViewportSize = { width: 1280, height: 800 };

const config: PlaywrightTestConfig = {
  testDir: ".",
  fullyParallel: true,
  reporter: "list",
  timeout: 60_000,
  retries: process.env.CI ? 5 : 0,
  workers: process.env.CI ? 1 : undefined,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0,
      animations: "disabled",
    },
  },
  webServer: process.env.BASE_URL ? undefined :  [
    {
      command: "npm run server",
      reuseExistingServer: !process.env.CI,
      stdout: "ignore",
      stderr: "ignore",
      timeout: 30_000,
      url: baseUrl,
    },
  ],
  projects: [
    {
      name: "firefox",

      use: {
        ...devices["Desktop Firefox"],
        baseURL: baseUrl,
        viewport: viewPort,
        screenshot: "off",
        video: "off",
        trace: "off",
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL: baseUrl,
        viewport: viewPort,
        screenshot: "off",
        video: "off",
        trace: "off",
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: baseUrl,
        viewport: viewPort,
        screenshot: "off",
        video: "off",
        trace: "off",
      },
    },
  ],
};

export default config;