const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl');

router.post('/login', ctrl.logIn);
router.post('/signup', ctrl.signUp);
router.get('/logout', ctrl.logOut);

module.exports = router;
