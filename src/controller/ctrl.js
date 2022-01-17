const indexPage = async (req, res, next) => {
    try{
        const { user } = req.session;
        return res.render('index.pug', { user });
    } catch(err){
        return next(err);
    }
};

const firstPageGoods = async (req, res, next) => {
    try{
        return res.redirect('goods/1');
    }catch (err){
        return next(err);
    }
};

const GoodsList = async(req, res, next) => {
    try{
        console.log('goodsList');
    } catch(err){
        return next(err);
    }
};

module.exports = { indexPage, firstPageGoods, GoodsList};