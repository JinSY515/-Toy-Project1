//require('./env');
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
    console.log(req.session.user);
    console.log(req.session.user.id);
    res.render('./menu/musical.pug', { dispname : user.name });
});
app.get('/concert', (req, res) => res.render('./menu/concert.pug'));
app.get('/goods', (req, res) => res.render('./menu/goods.pug'));

app.post('/signup', ctrl.signUp);
app.post('/login', ctrl.logIn);
app.get('/logout', ctrl.logOut);
app.listen(port, ()=> console.log(`Server listening on port ${port}`));

