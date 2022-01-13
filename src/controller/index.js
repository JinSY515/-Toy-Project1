const { Router }= require('express');
const ctrl = require('./ctrl');
const auth = require('./auth');
const calendar = require('./calendar');
const router = Router();

router.get('/', ctrl.indexPage);
router.use('/auth', auth);
//router.use('/calendar', calendar);

module.exports = router;