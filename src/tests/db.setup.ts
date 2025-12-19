import db from "@/lib/db";
import { createTestSession } from "@/lib/test-auth";
import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("seed database and authenticate", async ({ page }) => {
  const userResult = await db.query(`
  INSERT INTO users (username, email, created_at) VALUES
  ('testuser', 'test@test.com', CURRENT_TIMESTAMP)
  ON CONFLICT (email) DO UPDATE SET username = 'testuser'
  RETURNING id
`);

  const userId = userResult.rows[0].id;

  const recipeResult = await db.query(
    `
  INSERT INTO recipes (user_id, title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, created_at) VALUES
  ($1, 'Test Recipe', 'This is a test recipe.', $2, 'Step 1, Step 2', 10, 20, 2, '⭐', CURRENT_TIMESTAMP)
  RETURNING id`,
    [userId, JSON.stringify(["Ingredient 1", "Ingredient 2"])]
  );

  const recipeId = recipeResult.rows[0].id;

  await db.query(
    `
  INSERT INTO saved_recipes (user_id, recipe_id, saved_at) VALUES
  ($1, $2, CURRENT_TIMESTAMP)
  ON CONFLICT DO NOTHING`,
    [userId, recipeId]
  );

  const sessionToken = await createTestSession(userId);

  await page.goto("http://localhost:3000");
  await page.context().addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
  ]);

  await page.context().storageState({ path: authFile });

  console.log("Database seeded and user authenticated");
});
