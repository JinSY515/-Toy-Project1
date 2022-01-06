//user database접근

const { runQuery } = require('../lib/database');

const createName = async (username, pwd, displayName) => {
    const sql = 'INSERT INTO users (username, pwd, displayName) value (?, ?, ?);';
    await runQuery(sql, [username, pwd, displayName]);
};

const getByUsername = async username => {
    const sql = 'SELECT id, pwd, displayName FROM users WHERE username = ?';
    const results = await runQuery(sql, [username]);
    return results[0];
};

module.exports = {
    createName,
    getByUsername,
};