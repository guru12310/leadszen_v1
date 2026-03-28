const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'capture_crm',
//   password: 'guru90039',
//   port: 5432,
// });


// const pool = new Pool({
//   connectionString: 'postgresql://postgres:leadszen%40v12026@db.bbxdpryxehwejuxiahsy.supabase.co:5432/postgres',
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const pool  = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
  family: 4 // force IPv4


})


// module.exports = pool;

module.exports = {
  query: (text, params) => pool.query(text, params),
};