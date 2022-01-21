const express= require('express');
const session = require('express-session');
const controller = require('./controller');
var path = require('path');
const app = express();

app.use(session({
    secret : 'adfjn32jrq923owenals',
    resave:false,
    saveUnitialized : true,
}));

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended : true }));
app.use('/', controller);

//app.use('/js', express.static('public/js'));

app.use('/js', express.static(path.join(__dirname, '/../views/js')));

module.exports = app;