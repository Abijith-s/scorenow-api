const express = require('express');
const { adminLogin, playerImagesUpload, getPlayersImage, fetchUserProfilePictureforChat, getPlayerSearchResult, webBannerUpload, mobileBannerUpload, getTommorowsMatchesController, getUpcomingMatchesController, getWebBannerImages } = require('../adminController/adminController');
const router = express.Router();

router.post('/authentication',adminLogin);
router.post('/get-players-searchlist',getPlayerSearchResult);
router.post('/upload-player-image',playerImagesUpload);
router.post('/upload-banner-image-web',webBannerUpload);
router.post('/upload-banner-image-mobile',mobileBannerUpload);
router.get('/get-player-image/:playerId',getPlayersImage);
router.get('/get-user-profile/:userId',fetchUserProfilePictureforChat);
router.post('/get-tommorows-match',getTommorowsMatchesController);
router.get("/get-upcoming-matches", getUpcomingMatchesController);
router.get('/get-banner-image',getWebBannerImages);

module.exports = router;
