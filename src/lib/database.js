const mysql = require('mysql2/promise');
/*
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
*/
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'projectuser',
    password: 'projectpwd',
    database : 'toy_db1',
});

const runQuery = async (pstmt, data) => {
   const conn = await pool.getConnection();
    try {
        const sql = conn.format(pstmt, data);
        const [ result ] = await conn.query(sql);
    
        return result;
    }finally {
        conn.release();
    }
};

module.exports = { runQuery };