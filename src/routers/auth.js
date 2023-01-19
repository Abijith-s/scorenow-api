const express = require('express');
const router = express.Router();
const { register, login, logout, verifyPhoneNumber, otpLogin } = require("../controllers/auth");
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyAccessToken } = require('../middlewares/token');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/verifyPhoneNumber',verifyPhoneNumber);
router.post('/otpLogin',otpLogin);

router.get('/check', authMiddleware, (req, res) => {
    res.send("Loginned");
});

module.exports = router;