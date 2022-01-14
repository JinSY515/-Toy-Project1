const { GoodsDAO } = require('../../DAO');
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
        console.log(price_table);
        var table = '';
        for(i=0; i<price_table.length; i++){
            table = table.concat(price_table[i]['seatLevel']);
            table = table.concat('   ');
            var comma = price_table[i]['price'].toLocaleString();
            table = table.concat(comma);
            //table = table.concat(price_table[i]['price']);
            table = table.concat('원\n');
        }
        console.log(table);
        table = table.replace(/\n/g, '<br><br>');
        return res.render('menu/goods.pug', { musical_name,  hall_name, period_start, period_end, able_age, running_time, table });

    } catch(err){
        console.log('error!');
        switch (err.message) {
            case 'INPUT_FAIL':
                return res.send(getAlertScript('페이지를 찾을 수 없습니다.'));
        }
    }
};


module.exports = { readGoods };
