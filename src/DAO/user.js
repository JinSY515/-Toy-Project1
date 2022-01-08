//user database접근

const { runQuery } = require('../lib/database');

const createAccount = async (userid, name, phone, password) => {
    const sql = 'INSERT INTO users (userid, name, phone, password) value (?, ?, ?, ?);';
    await runQuery(sql, [userid, name, phone, password]);
 
};

const getByUserID = async userid => {
    const sql = 'SELECT userid, name, password FROM users WHERE userid = ?;';
    const results = await runQuery(sql, [userid]);
    return results[0];
};

const getByUserInfo = async (name, phone) => {
    const sql = 'SELECT userid FROM users WHERE name = ? and phone = ?;';
    const results = await runQuery(sql, [name, phone]);
    return results[0];
};

module.exports = {
    createAccount,
    getByUserID,
    getByUserInfo,
};