import { expect, Page, test } from "@playwright/test";
import { AxeBuilder} from "@axe-core/playwright";
import mock from "./mock.json";

test("Works with mock", async ({ page }) => {
  const base = (test.info().project.use?.baseURL ?? process.env.BASE_URL ?? "");
  if (!base.toLowerCase().includes("localhost")) {
    test.skip(true, "Skipping on remote");
  }
  
  await page.route("**/api.php**", async route =>
  {
    await route.fulfill({
      body: JSON.stringify(mock),
    })
  });

  await page.goto("/");
  
  await page.waitForSelector(".trivia-loading", { state: "hidden" });

  const title = test.info().title;

  const booleanQuestion = page.locator(".trivia-question")

  await expect(booleanQuestion).toContainText("Question: True or False?");
    
  await expect(page).toHaveScreenshot(`${title}-question-boolean.png`);

  await page.click(".trivia-next-button")

  const multipleQuestion = page.locator(".trivia-question")

  await expect(multipleQuestion).toContainText("Question: A, B, C or D?");

  await expect(page).toHaveScreenshot(`${title}-question-multiple.png`);
});

test("Works with mask", async ({ page }) => {
  await page.goto("/");
  
  await page.waitForSelector(".trivia-loading", { state: "hidden" });
  
  const maskId = "trivia-container-mask";
  await maskEverythingBelow(page, ".trivia-buttons", maskId);

  await expect(page).toHaveScreenshot({
    mask: [
      page.locator(`#${maskId}`)
    ]
  });
});

test("No accessibility violations", async ({ page }) => {
  await page.goto("/");

  await page.waitForSelector(".trivia-loading", { state: "hidden" });

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

async function maskEverythingBelow(page: Page, selector: string, maskId: string) {
  await page.evaluate(([selector, maskId]) => {
    const el = document.querySelector(selector);
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const mask = document.createElement("div");
    mask.id = maskId;
    
    Object.assign(mask.style, {
      position: "absolute",
      top: (rect.bottom + window.scrollY) + "px",
      left: "0",
      width: "100%",
      height: "200vh",
      zIndex: "999999",
      pointerEvents: "none",
      background: "white"
    });
    
    document.body.appendChild(mask);
  }, [selector, maskId]);
}