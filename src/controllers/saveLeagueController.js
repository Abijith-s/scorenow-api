const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { Leagues } = require("../models/leagues");
const { SportMonks } = require("../services/sportmonks");

const Api = new SportMonks();
const saveLeagueController = async (req, res, next) => {
    try {

        let { data } = await Api.getLeagues();
        await Leagues.insertMany(data.data);
        return res.json({
            status: true,
            message: "Added leagues successfully"
        });

    } catch (err) {
        return next(new InternalServerError());
    }
};

module.exports = {
    saveLeagueController
};