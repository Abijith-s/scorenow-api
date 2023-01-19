const favouritesSerives = require("../services/favouritesServices/favouriteServices");
const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { SportMonks } = require("../services/sportmonks");
const { uploadImage, fetchProfilePicture } = require("../services/userServices/userProfilePicture");
const { fetchPlayerImages, uploadPlayersImage, uploadMobileBannerImage, uploadWebBannerImage, fetchBannerImages } = require("../services/adminServices/adminService");
const { tommorowsMatchParser, upcomingMatchesParser } = require("../services/sportmonks/parser");

const SportApi = new SportMonks();

const adminUserName = 'admin';
const adminPassword = 'password';


const  adminLogin = (req,res) =>{
    if(req.body.adminUserName === adminUserName && req.body.adminPassword === adminPassword){
        res.json({
            status: true,
            message: "admin login successfull"
        });
    }else{
        res.json({
            status: false,
            message: "admin login failed"
        });
    }
}

const getPlayerSearchResult = (req, res, next) => {
    favouritesSerives
      .getSearchedPlayerList(req.body.searchText)
      .then((data) => {
        if (data) {
          res.json({
            data: data,
          });
        } else return next(new InternalServerError());
      })
      .catch((err) => {
        return next(new BadRequestError(err));
      });
  };

const playerImagesUpload = (req,res)=>{
    uploadPlayersImage(req.body.playerImage,req.body.playerId);
    return res.json({
        status: true,
        message: "Player Image uploaded Succesfully"
    });
}

const webBannerUpload = (req,res)=>{
    uploadWebBannerImage(req.body.bannerImage);
    return res.json({
        status: true,
        message: "Player Image uploaded Succesfully"
    });
}

const mobileBannerUpload = (req,res)=>{
    uploadMobileBannerImage(req.body.bannerImage,req.body.bannerId);
    return res.json({
        status: true,
        message: "Player Image uploaded Succesfully"
    });
}

const getPlayersImage = (req,res,next) =>{
    fetchPlayerImages(req.params.playerId) .on('error', (err) => {
        console.log(err);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Resource not found" })
        }
    })
    .pipe(res);
}

const getWebBannerImages = (req,res,next) =>{
    fetchBannerImages() .on('error', (err) => {
        console.log(err);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Resource not found" })
        }
    })
    .pipe(res);
}

const fetchUserProfilePictureforChat = (req,res,next)=>{
    fetchProfilePicture(req.params.userId)
    .on('error', (err) => {
        console.log(err);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Resource not found" })
        }
    })
    .pipe(res);
}

const getTommorowsMatchesController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getTommorowsMatch();
        let response = await tommorowsMatchParser(data);
        if(response){
            return res.json({
                status: true,
                data: response,
                message: "Fixture Matches Processed Succesfully"
            });
        }else{
        return next(new InternalServerError());
        }
    } catch (err) {
        return next(new InternalServerError());
    }
};

const getUpcomingMatchesController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getUpcomingMatches();
        let response = await upcomingMatchesParser(data);
        return res.json({
            status: true,
            data: response,
            message: "Fixture Matches Processed Succesfully"
        });

    } catch (err) {
        return next(new InternalServerError());
    }
};







module.exports ={
    adminLogin,
    playerImagesUpload,
    getPlayersImage,
    fetchUserProfilePictureforChat,
    getPlayerSearchResult,
    webBannerUpload,
    mobileBannerUpload,
    getTommorowsMatchesController,
    getUpcomingMatchesController,
    getWebBannerImages
}