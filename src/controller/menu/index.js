const { Router }= require('express');
const router = Router();
const ctrl = require('./ctrl');

router.get('/goods/:page(\\d+)', ctrl.readGoods);

console.log('menu-index');

module.exports = router;
