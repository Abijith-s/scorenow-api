const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { Players } = require("../models/players");
const { SportMonks } = require("../services/sportmonks");
const { matchDetailParser } = require("../services/sportmonks/parser");

const sportApi = new SportMonks();

const getMatchDetailsController = async (req, res, next) => {
    try {
        let { matchId } = req.params;
        let { data } = await sportApi.matchDetails(matchId);

        const response = await matchDetailParser(data.data);

        return res.json({
            status: true,
            data: response,
            message: "Processed Match details"
        });

    } catch (err) {
        console.log(err.response);
        return next(new InternalServerError());
    }

};

module.exports = {
    getMatchDetailsController
}