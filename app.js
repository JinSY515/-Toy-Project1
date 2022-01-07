const express= require('express');
const session = require('session');
const app = express();



app.use(session({
    secret : SESSION_SECRET,
    resave:false,
    saveUnitialized : true,
}));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

module.exports = app;