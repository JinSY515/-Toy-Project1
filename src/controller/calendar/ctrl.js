const { GoodsDAO } =require('../../DAO');

const DateSelected = async(musical_id, show_date_id, time_id) => {
    try{
        let casting = await GoodsDAO.getScheduleByDate(musical_id, show_date_id, time_id);
        console.log(casting);
        return casting;
    }catch(err){

    }
};


module.exports = { DateSelected };