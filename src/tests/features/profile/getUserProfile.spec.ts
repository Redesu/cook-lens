import { test, expect } from "@playwright/test";

test("get user profile", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");
  await page.waitForLoadState("networkidle");
  expect(page.getByRole("heading", { name: "testuser" })).toBeVisible();
});
