const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { SportMonks } = require("../services/sportmonks");
const { liveMatchParser } = require("../services/sportmonks/parser");

const SportApi = new SportMonks();

const getLiveMatchController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getLiveScores();

        let response = await liveMatchParser(data)

        return res.json({
            status: true,
            data: response,
            message: "Live Matched Processed Succesfully"
        });

    } catch (err) {
        return next(new InternalServerError());
    }
};


module.exports = {
    getLiveMatchController
}