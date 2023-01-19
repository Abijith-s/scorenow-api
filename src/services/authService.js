const User = require('../models/userSchema');
const rejectMsg = require("../config/rejectMessage");
const bcrypt = require('bcrypt');
module.exports = {
    /* -------------- to register User with some required data -------------- */
    userRegister: (data) => {
        return new Promise(async (resolve, reject) => {
            const isUserExist = await User.findOne({$or:[{email:data.email},{phoneNumber:data.phoneNumber}]});
            if (isUserExist) {
                reject(rejectMsg.userExist);
            } else {
                const userData = new User({ ...data });
                userData.save().then((result) => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                })
            }
        })
    },  

    /* ---------------------------- to User login --------------------------- */
    userLogin: (data) => {
        return new Promise((resolve, reject) => {
            const { email, password } = data;
            User.findOne({ email }).then(result => {
                if (result) {
                    result.comparePassword(password, (err, success) => {
                        if (err) console.err(err);
                        else {
                            if (success) {
                                resolve(result);
                            } else {
                                reject(rejectMsg.userLoginError);
                            }
                        }
                    })
                } else {
                    reject(rejectMsg.userLoginError);
                }
            })
        })
    },
    /* ---------------------------- Phone number verification --------------------------- */
    verifyUsersPhoneNumber: (data)=>{
        return new Promise(async(resolve,reject) =>{
            const phoneNumber = parseInt(data.phoneNumber);
            const phoneNumberExist = await User.findOne({phoneNumber: phoneNumber});
            if(phoneNumberExist){
                resolve(phoneNumberExist);
            }else{
                reject(rejectMsg.phoneNumberNotExist);
            }
        });
    },
    /* ---------------------------- Otp verification --------------------------- */
    otpAuthentication: (data)=>{
        return new Promise(async(resolve,reject)=>{
            const phoneNumber = data.phoneNumber;
            const phoneNumberExist = await User.findOne({phoneNumber: phoneNumber});
            if(phoneNumberExist){
                resolve(phoneNumberExist);
            }else{
                reject(rejectMsg.phoneNumberNotExist);
            }
        });
        
    }
}