import { test, expect } from "@playwright/test";

test("get user profile", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1, name: "testuser" })).toBeVisible();
});
