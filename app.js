const express= require('express');

const app = express();




const port= 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

module.exports = app;