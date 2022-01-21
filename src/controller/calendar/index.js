const { Router }= require('express');
const router = Router();
const ctrl = require('./ctrl');
router.get('/goods/:page(\\d+)', ctrl.DateSelected );

module.exports= router;