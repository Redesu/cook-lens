import { test, expect } from "@playwright/test";

test("get random recipe", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "See sample recipe →" }).click();
  await page.waitForURL("**/recipe/*");
  expect(page.url()).toMatch(/\/recipe\//);
});
