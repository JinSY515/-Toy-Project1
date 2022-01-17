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
};

const getRolesByID = async musical_id => {
    const sql = 'SELECT role_name FROM roles WHERE musical_id = ?;';
    const results = await runQuery(sql, [musical_id]);
    return results;
};

const getScheduleByID = async musical_id =>{
    const sql = 'SELECT show_date_id, time_sess, TT.time_id FROM datetable AS DT INNER JOIN timetable AS TT ON DT.time_id = TT.time_id WHERE musical_id = ? order by show_date_id, time_sess;';
    const results = await runQuery(sql, [musical_id]);
    return results;
};
const getScheduleByDate = async (musical_id, show_date_id, time_id) =>{
    const sql = 'select role_id, actor_name from (datetable as dt inner join timetable as tt inner join actors as a on dt.time_id = tt.time_id and dt.show_date_id = a.show_date_id and a.time_id = dt.time_id) where a.musical_id =? and a.show_date_id = ? and tt.time_id = ? order by role_id;';
    //const sql = 'select role_id, actor_name from actors as a where a.musical'
    const results = await runQuery(sql, [musical_id, show_date_id, time_id]);
    return results;
};

module.exports = {
    getInfoByID,
    getPriceTable,
    getRolesByID,
    getScheduleByID,
    getScheduleByDate
};