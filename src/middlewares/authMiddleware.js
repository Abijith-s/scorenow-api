const { NotAuthorizedError } = require("./ErrorHandlers/error-handlers/unauthorized-error");
const { verifyAccessToken } = require("./token");

const authMiddleware = (req, res, next) => {
    try {
        if (req.cookies?.jwt && verifyAccessToken(req.cookies?.jwt)) {
            req.userId = verifyAccessToken(req.cookies?.jwt).userId;
            next();
        }
        else return next(new NotAuthorizedError());
    } catch (err) {
        if (err.message == "jwt expired") {
            return next(new NotAuthorizedError());
        } else {
            return next(new NotAuthorizedError());
        }
    }
};

module.exports = {
    authMiddleware
}