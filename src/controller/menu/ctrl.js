const { GoodsDAO } = require('../../DAO');
const { getScheduleByID } = require('../../DAO/goods');
const getAlertScript = msg => `<script>alert("${msg}");history.back();</script>`;


const readGoods = async (req, res, next) => {
    try{
        const page = req.params.page;
        if(!page) throw new Error('INPUT_FAIL');
        let info = await GoodsDAO.getInfoByID(page);
        const hall_name = info['hall_name'];
        const musical_name = info['musical_name'];
        const period_start = info['period_start_id'];
        const period_end = info['period_end_id'];
        const able_age = info['able_age'];
        const running_time = info['running_time'];
        const price_table_id = info['price_table_id'];
        let price_table = await GoodsDAO.getPriceTable(price_table_id);
       
        var table = '';
        for(i=0; i<price_table.length; i++){
            table = table.concat(price_table[i]['seatLevel']);
            table = table.concat('   ');
            var comma = price_table[i]['price'].toLocaleString();
            table = table.concat(comma);
            //table = table.concat(price_table[i]['price']);
            table = table.concat('원\n');
        }

        table = table.replace(/\n/g, '<br><br>');

        const col = await readRoles(page);
        const schedule = await readScheduleFirstPage(page);
        return res.render('menu/goods.pug', { musical_name,  hall_name, period_start, period_end, able_age, running_time, table, casting_table:col, schedule_table : schedule});
        
    } catch(err){
        switch (err.message) {
            case 'INPUT_FAIL':
                return res.send(getAlertScript('페이지를 찾을 수 없습니다.'));
        }
    }
};

const readRoles = async musical_id=> {
    try{
        if(!musical_id) throw new Error('INPUT_FAIL');
        let roles = await GoodsDAO.getRolesByID(musical_id);
     
        var col = '<tr>\n\t<th>관람일</th>\n\t<th>시간</th>\n';
        for(i=0; i<roles.length; i++){
            col = col.concat('\t<th>');
            col = col.concat(roles[i]['role_name']);
            col = col.concat('</th>\n');
        }
        col = col.concat('</tr>');
        
        return col;
       
    }catch(err){
        switch(err.message){
            case 'INPUT_FAIL':
                return res.send(getAlertScript('페이지를 찾을 수 없습니다.'));
        }
    }
};

const readScheduleFirstPage =async musical_id =>{
    try{
        if(!musical_id) throw new Error('INPUT_FAIL');
        let schedule = await GoodsDAO.getScheduleByID(musical_id);
        var col = '';
        for(i=0; i<schedule.length; i++){
            var table='';
            col = col.concat('<tr>\n');
            col = col.concat('\t<th>');
            col = col.concat(schedule[i]['show_date_id']);
            col = col.concat('</th>\n');
            col = col.concat('\t<th>');
            col = col.concat(schedule[i]['time_sess']);
            col = col.concat('</th>\n');
            //table = await RolesBySchedule(musical_id, schedule[i]['show_date_id'], schedule[i]['time_id']);   
            table = await GoodsDAO.getScheduleByDate(musical_id, schedule[i]['show_date_id'], schedule[i]['time_id']);
            for(j=0; j<table.length; j++){
                col = col.concat('\t<th>');
                col = col.concat(table[j]['actor_name']);
                col = col.concat('</th>\n');
            }
            //col = col.concat(table);
        }
        col = col.concat('</tr>');
  
        return col;
    }catch(err){
        switch(err.message){
            case 'INPUT_FAIL':
                return res.send(getAlertScript('페이지를 찾을 수 없습니다.'));
        }
    } 
};


const RolesBySchedule = async (musical_id, show_date_id, time_id)=>{
    try{
        if(!musical_id) throw new Error('INPUT_FAIL');
        
        let schedule = await GoodsDAO.getScheduleByDate(musical_id, show_date_id, time_id);
        var col = '';
        for(i=0; i<schedule.length; i++){
            col = col.concat('\t<th>');
            col = col.concat(schedule[i]['actor_name']);
            col = col.concat('</th>\n');
        }
        console.log(col);
        return col;
    }catch(err){
        switch(err.message){
            case 'INPUT_FAIL':
                return res.send(getAlertScript('페이지를 찾을 수 없습니다.'));
        }
    }
}


function popup(){
    window.open('menu/hall_popup.pug', 'popup', 'width = 400, height = 300, left = 100, top = 50');
}
module.exports = { readGoods, popup, readRoles };
