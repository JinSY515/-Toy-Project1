const { UserDAO } = require('../../DAO');

const { verifyPassword, generatePassword } = require('../../lib/auth');

const logInForm = async (req, res, next) => {
    try {
        const { user } = req.session;
        // user가 존재하면
        if (user) return res.redirect('/');
        else return res.render('auth/login.pug', { user });
        
    } catch(err){
        return next(err);
    }
};

const logIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new Error('BAD_REQUEST');
        const user = await UserDAO.getByUsername(username);
        if (!user) throw new Error('UNAUTHORIZED');
        const validPwd = await verifyPassword(password, user.password);
        if (!validPwd) throw new Error('UNAUTHORIZED');

        req.session.user = {
            id : user.id,
            username : user.username,
            displayName : user.displayName,
            //추가?

        };
        return res.redirect('/');
    } catch(err){
        return next(err);
    }
};

const logOut = async (req, res, next) => {
    try {
        req.session.destroy(err => {
            if(err) throw err;
            else res.redirect('/');

        })
    } catch(err){
        return next(err);
    }
};

const signUpForm = async (req, res, next) => {
    try{
        const { user } = req.session;
        return res.render('auth/signup.pug', { user });
    }catch(err){
        return next(err);
    }
};

const signUp = async (req, res, next) => {
    try{
        const { userid, name, phone, password, repassword } = req.body;
        //하나라도 빠질 경우 bad request, 
        //password != repassword일 경우에도 bad request,

        if(!userid|| !name || !phone || !password || !repassword) throw new Error('BAD_REQUEST');
        if(password!=repassword) throw new Error('BAD_REQUEST');

        //중복확인?
        const hashedPwd = await generatePassword(password);
        await UserDAO.createAccount(userid, name, phone, hashedPwd);
        return res.redirect('/');
    }catch(err){
        return next(err);
    }
};


module.exports = { logInForm, logIn, logOut, signUpForm, signUp, };