const { runQuery } = require('../lib/database');

const getInfoByID = async page => {
    //const sql = 'SELECT musical_id, hall_id, period_start_id, period_end_id, running_time, able_age, hall_name, location, phone, homepage, seat_num FROM musicals, concert_hall WHERE musical_id = ? and period_start_id = ?;';
    const sql = 'SELECT * FROM musicals, concert_hall WHERE musical_id = ?;';
    const results = await runQuery(sql, [page]);
    return results[0];
    
};

const getPriceTable = async price_table_id => {
    const sql = 'SELECT seatLevel, price FROM ticket_price WHERE price_table_id = ? order by price desc;';
    const results = await runQuery(sql, [price_table_id]);
    return results;
}

module.exports = {
    getInfoByID,
    getPriceTable,
};