import { Pool } from 'pg'

const DbConfig = {
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'zombieplus',
    password: process.env.PGPASSWORD || 'pwd123',
    port: Number(process.env.PGPORT) || 5432,
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
