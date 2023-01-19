const jwt = require("jsonwebtoken");
module.exports = {
  generateAccessToken: (userId) => {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: "24hr", });
  },
  verifyAccessToken: (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET)
  }
}