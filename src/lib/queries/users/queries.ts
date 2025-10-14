import db from "@/lib/db";
import { User } from "@/types";

export function upsertUser(username: User['username'], email: User['email'], avatar_url?: User['avatar_url']) {
    const user = db.query(
        `INSERT INTO users
         (username, email, avatar_url, created_at) 
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP) ON CONFLICT (email)
         DO UPDATE SET
            username = EXCLUDED.username,
            avatar_url = EXCLUDED.avatar_url,
            updated_at = CURRENT_TIMESTAMP
        RETURNING *`,
        [username, email, avatar_url]
    );

    return user;
}

export function getUserByEmail(email: User['email']) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}

export function getUserById(id: User['id']) {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
}