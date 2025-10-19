import { Pool } from "pg";

// if you are using a local database, then use the following:
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD || '',
//     port: Number(process.env.DB_PORT) || 5432,
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

const db = {
    query: (text: string, params?: unknown[]) => pool.query(text, params),
}

export default db;