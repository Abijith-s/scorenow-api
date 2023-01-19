const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { SportMonks } = require("../services/sportmonks");
const { teamRankingParser } = require("../services/sportmonks/parser");

const SportApi = new SportMonks();

const getTeamRankingsController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getRankings();
        let response = await teamRankingParser(data.data)
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
    getTeamRankingsController
}