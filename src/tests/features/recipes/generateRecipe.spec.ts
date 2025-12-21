import { test, expect } from "@playwright/test";

test("generate a recipe", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page
    .getByRole("textbox", { name: "Type ingredients (e.g.," })
    .fill("chicken, rice, broccoli");
  await page.getByRole("button", { name: "Generate Recipe" }).click();
  await page.waitForURL("**/results*");
  await expect(page.getByRole("heading", { name: "Recipe Ideas" }));
  await expect(await page.locator("div").nth(5));
});
