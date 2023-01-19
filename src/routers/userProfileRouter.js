const express = require("express");
const {
  userProfileDetails,
  userProfileEdit,
  userPasswordEdit,
  userProfilePictureUpdate,
  fetchUserProfilePicture,
} = require("../controllers/userProfile");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/user-details", userProfileDetails);
router.post("/edit-user-details", authMiddleware, userProfileEdit);
router.post("/edit-user-password", authMiddleware, userPasswordEdit);
router.post(
  "/upload-profile-picture",
  authMiddleware,
  userProfilePictureUpdate
);
router.get("/fetch-profile-picture", authMiddleware, fetchUserProfilePicture);

module.exports = router;
