const rejectMessage = require('../../config/rejectMessage');
const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');

module.exports = {
    userProfileDetails : (data)=>{
        return new Promise(async(resolve,reject)=>{
            const getUserDetails = await  User.findOne({email: data.email});
            if(getUserDetails){
                resolve(getUserDetails);
            }else {
                reject(rejectMessage.userNotExist);
            }
        });
    },

    userProfileEdit : (data,userId)=>{
        return new Promise(async(resolve,reject)=>{
                await  User.updateOne({_id:userId},{$set:{
                    name:data.newName,
                    email:data.newEmail,
                    phoneNumber:data.newPhoneNumber,
                 }}).then((res)=>{
                    resolve(res);
                 }).catch((err)=>{
                    reject(err);
                 });
        });
    },

    editUserPassword: (data,userId)=>{
        console.log("new password",data)
        return new Promise(async(resolve,reject)=>{
            await User.findOne({_id:userId}).then(async(result)=>{
                console.log("password",result)
                let validatePassword = await bcrypt.compare(data.oldPassword,result.password)
                console.log("validate password",validatePassword)
                if(validatePassword){
                    data.newPassword =await bcrypt.hash(data.newPassword,10);
                        User.updateOne({_id:userId},{$set:{
                            password: data.newPassword
                         }}).then((res)=>{
                            resolve(res)
                         })
                    }else{
                        reject("old password is invalid");
                    }
                }).catch((err)=>{
                    reject(err);
                });
            })
    },
    
    uploadProfilePicture: (data,userId)=>{
        return new Promise(async(resolve,reject)=>{
            await  User.findOne({_id:userId}).then((res)=>{
                resolve(true);
             }).catch((err)=>{
                reject(err);
             });
        });
    }
};