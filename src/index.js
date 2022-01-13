//require('./env');
const { JSDOM } = require('jsdom');
const app = require('./app');
const ctrl = require('./controller/auth/ctrl');
const port = process.env.PORT || 3000;

app.get('/', function (req, res, next) {
    if(req.session.num === undefined){
        req.session.num = 1;
    }else{
        req.session.num = req.session.num + 1;
    }
    sess = req.session;

    //const { user } = req.session;
    res.render('index.pug', { dispname : sess.user.name });
})
app.get('/login', (req, res) => res.render('./auth/login.pug'));
app.get('/signup', (req, res) => res.render('./auth/signup.pug'));
app.get('/musical', (req, res) => {
    const { user } = req.session;
    if(user){
        res.render('./menu/musical.pug', { dispname : user.name });
    }
    else{
        res.render('./menu/musical.pug');
    }
    //console.log(req.session.user);
    //console.log(req.session.user.id);
    res.render('./menu/musical.pug', { dispname : user.name });
});
app.get('/concert', (req, res) => res.render('./menu/concert.pug'));
app.get('/goods', (req, res) => res.render('./menu/goods.pug'));

app.post('/signup', ctrl.signUp);
app.post('/login', ctrl.logIn);
app.get('/logout', ctrl.logOut);
//app.get('/goods/calendar', (req, res) => res.render('./calendar/calendar.pug'));
app.get('/calendar', (req, res) => {
    console.log('calendar start');
    res.render('./calendar/calendar.html');
});

//app.get('/calendar', (req, res) => res.render_template('./calendar/calendar.pug'));
/*
app.get('/calendar', (req, res) =>{
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = today.getDate();
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDate = new Date(today.getFullYear(),  today.getMonth() + 1, 0);
    console.log(dom.window.document.getElementById("main").textContent);
    var count = 0;
    var rows = null;
    function createCalendar(){
        
        for(i=0; i<firstDate.getDay(); i++){
            count+=1;
        }

    }
    res.render('./calendar/calendar.pug', { month });
    
    createCalendar();
});
*/
app.listen(port, ()=> console.log(`Server listening on port ${port}`));

