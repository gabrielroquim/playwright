import { Pool } from 'pg'
require('dotenv').config()

const DbConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'zombieplus',
    password: process.env.DB_PASSWORD || 'pwd123',
    port: Number(process.env.DB_PORT) || 5432,
}

const pool = new Pool(DbConfig)

export async function executeSQL(sql, params = []) {
    const client = await pool.connect()
    try {
        const result = await client.query(sql, params)
        return result
    } finally {
        client.release()
    }
}

export default pool

export async function closePool() {
    await pool.end()
}
