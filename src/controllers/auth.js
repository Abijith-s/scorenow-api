const userAuth = require('../services/authService');
const jwt = require("jsonwebtoken");
const jwtToken = require('../middlewares/token');
const { BadRequestError } = require('../middlewares/ErrorHandlers/error-handlers/bad-request-error');
const { InternalServerError } = require('../middlewares/ErrorHandlers/error-handlers/internal-server-error');

/* ---------------------- this is for user register --------------------- */
const register = (req, res, next) => {
    userAuth.userRegister(req.body).then((data) => {
        res.json({
            status: true,
            message: "Registration succesfull"
        });
    }).catch(err => {
        return next(new InternalServerError());
    });
};
/* ---------------------- this is for user Login --------------------- */

const login = (req, res, next) => {
    userAuth.userLogin(req.body).then((data) => {
        if (data && data._id) {
            const token = jwtToken.generateAccessToken(data._id);
            res.cookie('jwt', token, {
                secure: process.env.PRODUCTION === "true" ? true : false,
                maxAge: 1 * 24 * 60 * 60 * 1000, /* day * hour * 60 * 60 * 1000  */
                sameSite: "none",
                path: "/"
            });

            return res.json({
                userId:data._id,
                name: data.name,
                email: data.email,
                profilePicture:data.profilePicture,
                loginStat: true
            });

        }
        else return next(new InternalServerError());
    }).catch(err => {
        return next(new BadRequestError(err))
    });

};

const verifyPhoneNumber = (req,res,next) =>{
    userAuth.verifyUsersPhoneNumber(req.body).then((data)=>{
        if(data){
            res.json({
                phoneNumberVerifystatus:true,
                message: "phone number verified"
            })
        }
    }).catch(err => {
        return res.status(400).json({ phoneNumberVerifystatus: false, message: "phone number not exist" })
    });
}

const logout = (req, res, next) => {
    res.clearCookie('jwt', {
        path: "/",
        secure: true,
        sameSite: "none"
    });
    res.json({
        loginStat: false,
        message: "Logged out successfully"
    });
};

const otpLogin = (req,res,next) =>{
    userAuth.otpAuthentication(req.body).then((data)=>{
        if (data && data._id) {
            const token = jwtToken.generateAccessToken(data._id);

            res.cookie('jwt', token, {
                secure: process.env.PRODUCTION === "true" ? true : false,
                maxAge: 1 * 24 * 60 * 60 * 1000, /* day * hour * 60 * 60 * 1000  */
                sameSite: "none",
                path: "/"
            });

            return res.json({
                name: data.name,
                email: data.email,
                loginStat: true
            });

        }
        else return next(new InternalServerError());
    }).catch(err => {
        return next(new BadRequestError(err))
    });
}


module.exports = {
    register,
    login,
    logout,
    verifyPhoneNumber,
    otpLogin
};