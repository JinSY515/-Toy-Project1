const { METHODS } = require('http');
const { UserDAO } = require('../../DAO');
const { verifyPassword, generatePassword } = require('../../lib/auth');
const getAlertScript = msg => `<script>alert("${msg}");history.back();</script>`;
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

        if(req.session.user) {
            res.send(getAlertScript('이미 로그인되어 메인 화면으로 이동합니다.'));
            return res.redirect('/');
        }

        const { userid, password } = req.body;
        if (!userid || !password) throw new Error('INPUT_FAIL');
        const user = await UserDAO.getByUserID(userid);
        if (!user) throw new Error('UNAUTHORIZED');
        const validPwd = await verifyPassword(password, user.password);
        if (!validPwd) throw new Error('UNAUTHORIZED');
        
        req.session.user = {
            id : user.userid,
            name : user.name,
            //추가?
        };
        
        return req.session.save(()=> {
            return res.redirect('/');
        })
       
    } catch(err){
        switch (err.message) {
            case 'EXIST':
                return res.send(getAlertScript('이미 존재하는 계정입니다.'));
            case 'PWD_FAIL':
                return res.send(getAlertScript('비밀번호가 일치하지 않습니다.'));
            case 'INPUT_FAIL':
                return res.send(getAlertScript('올바르지 않은 입력입니다.'));
            case 'UNAUTHORIZED':
                return res.send(getAlertScript('권한이 없습니다!'));
            case 'NOT_FOUND':
                return res.send(getAlertScript('404 NOT FOUND!'));
        }
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
        return res.render('../../views/auth/signup.pug', { user });
    }catch(err){
        return next(err);
    }
};

const signUp = async (req, res, next) => {
    try{
        const { userid, name, phone, password, repassword } = req.body;
        //하나라도 빠질 경우 bad request, 
        //password != repassword일 경우에도 bad request,
        //이미 있는 아이디,이름,전화번호일 경우에도 error message
        if(!userid|| !name || !phone || !password || !repassword) throw new Error('INPUT_FAIL');
        if(password!=repassword) throw new Error('PWD_FAIL');
        else if(password.length<8 || password.length >24) throw new Error('INPUT_FAIL');
        if(phone.length!= 11) throw new Error('INPUT_FAIL');
        //중복확인?
        let user = await UserDAO.getByUserID(userid);
        if(user) throw new Error('EXIST');
        user = await UserDAO.getByUserInfo(name,phone);
        if(user) throw new Error('EXIST');
        const hashedPwd = await generatePassword(password);
        await UserDAO.createAccount(userid, name, phone, hashedPwd);
        return res.redirect('/login');
    } catch(err){
        switch (err.message) {
            case 'EXIST':
                return res.send(getAlertScript('이미 존재하는 계정입니다.'));
            case 'PWD_FAIL':
                return res.send(getAlertScript('비밀번호가 일치하지 않습니다.'));
            case 'INPUT_FAIL':
                return res.send(getAlertScript('올바르지 않은 입력입니다.'));
            case 'UNAUTHORIZED':
                return res.send(getAlertScript('권한이 없습니다!'));
            case 'NOT_FOUND':
                return res.send(getAlertScript('404 NOT FOUND!'));
        }
    }
};


module.exports = { logInForm, logIn, logOut, signUpForm, signUp, };