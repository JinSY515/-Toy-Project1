const { Router }= require('express');
const router = Router();

const ctrl = require('./ctrl');
router.get('/goods/:page(\\d+)', [ctrl.readGoods, ctrl.readRoles]);
//router.get('/goods/:page(\\d+)#', ctrl.readRoles);
//router.get('/goods/:page(\\d+)', ctrl.readGoods);

module.exports = router;
