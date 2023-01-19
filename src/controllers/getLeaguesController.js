const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { SportMonks } = require("../services/sportmonks");
const { leagueParser } = require("../services/sportmonks/parser");

const SportApi = new SportMonks();

const getLeaguesController = async (req, res, next) => {
    try {
        const { status, data, message } = await SportApi.getLeagues();

        let response = await leagueParser(data)
        return res.json({
            status: true,
            data: response,
            message: "Fixture Matched Processed Succesfully"
        });

    } catch (err) {
        return next(new InternalServerError());
    }
};


module.exports = {
    getLeaguesController
}