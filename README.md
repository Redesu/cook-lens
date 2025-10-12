| Table | Purpose | Query |
|-------|---------|-------|
| `recipes` | All recipes (who created them) | `WHERE user_id = me` |
| `saved_recipes` | Bookmarks/favorites | `JOIN` with recipes `WHERE saved_recipes.user_id = me` |