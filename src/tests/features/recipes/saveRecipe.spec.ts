import { test, expect } from "@playwright/test";

test("save a recipe", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page
    .getByRole("textbox", { name: "Type ingredients (e.g.," })
    .fill("chicken, rice, broccoli");
  await page.getByRole("button", { name: "Generate Recipe" }).click();
  await page.waitForURL("**/recipe/*");
  await page.getByRole("button", { name: "Save Recipe" }).first().click();
  await page.waitForURL("**/recipe/*");
  expect(page.url()).toMatch(/\/recipe\//);
});
