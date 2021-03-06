const { Router }= require('express');
const ctrl = require('./ctrl');
const auth = require('./auth');
const menu = require('./menu');
const calendar = require('./calendar');
const router = Router();

router.get('/', ctrl.indexPage);
router.get('/goods/:page(\\d+)', menu);
//router.get('/goods/:page(\\d+)')
router.use('/auth', auth);
router.get('/calendar', calendar);
//router.use('/goods', ctrl.firstPageGoods);
//router.use('/calendar', calendar);

module.exports = router;