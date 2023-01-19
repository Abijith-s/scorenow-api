const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { SportMonks } = require("../services/sportmonks");
const { fixtureMatchesParser, finishedMatchesParser, upcomingMatchesParser } = require("../services/sportmonks/parser");

const SportApi = new SportMonks();

const getUpcomingMatchesController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getUpcomingMatches();
        let response = await upcomingMatchesParser(data)
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
    getUpcomingMatchesController
}