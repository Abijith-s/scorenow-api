const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { SportMonks } = require("../services/sportmonks");
const {  finishedMatchesParser } = require("../services/sportmonks/parser");

const SportApi = new SportMonks();

const getFinishedMatchesController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getFinishedMatches();
        let response = await finishedMatchesParser(data)
        return res.json({
            status: true,
            data: response,
            message: "Fixture Matches Processed Succesfully"
        });

    } catch (err) {
        return next(new InternalServerError());
    }
};


module.exports = {
    getFinishedMatchesController
}