import db from "@/lib/db";
import { test as teardown } from "@playwright/test";

teardown("teardown database", async () => {
  db.query("TRUNCATE recipes RESTART IDENTITY CASCADE;");
  db.query("TRUNCATE users RESTART IDENTITY CASCADE;");
  db.query("TRUNCATE saved_recipes RESTART IDENTITY CASCADE;");
  db.end();
  console.log("Teardown database completed");
});
