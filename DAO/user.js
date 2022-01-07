//user database접근

const { runQuery } = require('../lib/database');

const createAccount = async (userid, name, phone, password) => {
    const sql = 'INSERT INTO users (userid, name, phone, password) value (?, ?, ?, ?);';
    await runQuery(sql, [userid, name, phone, password]);
};

const getByUsername = async username => {
    const sql = 'SELECT id, pwd, displayName FROM users WHERE username = ?';
    const results = await runQuery(sql, [username]);
    return results[0];
};

module.exports = {
    createAccount,
    getByUsername,
};