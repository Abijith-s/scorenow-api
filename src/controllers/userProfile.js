const userProfileServices = require('../services/userServices/userProfileServices')
const {uploadImage, fetchProfilePicture} = require('../services/userServices/userProfilePicture')
const { BadRequestError } = require('../middlewares/ErrorHandlers/error-handlers/bad-request-error');
const { InternalServerError } = require('../middlewares/ErrorHandlers/error-handlers/internal-server-error');


const userProfileDetails = (req,res,next)=>{
    userProfileServices.userProfileDetails(req.body).then((data)=>{
        if(data){
            res.json({
                data:{
                    name:data.name,
                    email:data.email,
                    phoneNumber:data.phoneNumber
                },
                message: "user details fetched successfully"
            });
        } else return next(new InternalServerError());
    }).catch(err => {
        return next(new BadRequestError(err));
    });
};

const userProfileEdit = (req,res,next)=>{
    userProfileServices.userProfileEdit(req.body,req.userId).then((data)=>{
        if(data){
            res.json({
                data:{
                    name:req.body.newName,
                    email:req.body.newEmail,
                    phoneNumber:req.body.newPhoneNumber
                },
                message: "user details fetched successfully"
            });
        } else return next(new InternalServerError());
    }).catch(err => {
        return next(new BadRequestError(err));
    });
};

const userPasswordEdit = (req,res,next) =>{
    userProfileServices.editUserPassword(req.body,req.userId).then((data)=>{
        if(data){
            res.json({
                status:true,
                message: "user details fetched successfully"
            });
        } else return next(new InternalServerError());
    }).catch(err => {
        return next(new BadRequestError(err));
    });
};

const userProfilePictureUpdate = (req,res,next) =>{
    uploadImage(req.body.profilePicture,req.userId);
    userProfileServices.uploadProfilePicture(req.userId).then(async(data)=>{
        if(data){
            res.json({
                status:true,
                message: "user profile updated successfully"
            });
        } 
        else return next(new InternalServerError());
    }).catch(err => {
        return next(new BadRequestError(err));
    });
};

const fetchUserProfilePicture = (req,res,next)=>{
    fetchProfilePicture(req.userId)
    .on('error', (err) => {
        console.log(err);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Resource not found" })
        }
    })
    .pipe(res);
}



module.exports ={
    userProfileDetails,
    userProfileEdit,
    userPasswordEdit,
    userProfilePictureUpdate,
    fetchUserProfilePicture
};