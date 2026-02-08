import { type PlaywrightTestConfig, type ViewportSize } from "@playwright/test";
import { devices } from "playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:3333";

const viewports: Record<string, ViewportSize> = {
  mobile:  { width: 390,  height: 844 },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1440, height: 900 },
};

const browsers = [
  { name: "chromium", device: devices["Desktop Chrome"] },
  { name: "firefox", device: devices["Desktop Firefox"] },
  { name: "webkit", device: devices["Desktop Safari"] },
];

const config: PlaywrightTestConfig = {
  testDir: ".",
  fullyParallel: true,
  reporter: "list",
  timeout: 60_000,
  retries: process.env.CI ? 5 : 0,
  workers: undefined,
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
  projects: browsers.flatMap(({ name, device }) =>
    Object.entries(viewports).map(([viewportName, viewport]) => ({
      name: `${name}-${viewportName}`,
      use: {
        ...device,
        baseURL: baseUrl,
        viewport,
        screenshot: "off",
        video: "off",
        trace: "off",
      },
    }))
  )
};

export default config;