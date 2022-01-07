const express= require('express');
const router = express.Router();

const ctrl = require('./ctrl');
const auth = require('./auth');

router.get('/', ctrl.indexPage);
router.use('/auth', auth);
module.exports = router;