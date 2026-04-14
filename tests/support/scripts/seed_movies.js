import pool, { executeSQL, closePool } from '../fixtures/database.js'
import movies from '../fixtures/movies.json' assert { type: 'json' }

async function seed() {
  try {
    for (const key of Object.keys(movies)) {
      const m = movies[key]
      // Ajuste: assumimos que existe coluna unique em title ou usamos ON CONFLICT (title)
      const sql = `INSERT INTO movies (title, overview, company, release_year, featured, cover)
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT (title) DO NOTHING;`
      await executeSQL(sql, [m.title, m.overview, m.company, m.release_year, m.featured, m.cover])
      console.log('Inserted:', m.title)
    }
  } catch (err) {
    console.error('Seed error:', err)
  } finally {
    await closePool()
+    process.exit(0)
  }
}

seed()
