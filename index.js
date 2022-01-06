const app = require('./app');

const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.render('index.pug'));
app.get('/login', (req, res) => res.render('./auth/login.pug'));
app.get('/signup', (req, res) => res.render('./auth/signup.pug'));
app.listen(port, ()=> console.log(`Server listening on port ${port}`));