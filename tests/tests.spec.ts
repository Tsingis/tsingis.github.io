import { expect, Page, test } from "@playwright/test";
import { AxeBuilder} from "@axe-core/playwright";

test("Page loads", async ({ page }) => {
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