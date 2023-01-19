const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { Teams } = require("../models/teams");
const { SportMonks } = require("../services/sportmonks")

const Api = new SportMonks();

const saveTeamsController = async (req, res, next) => {
    try {
        const { data } = await Api.getTeams();
        await Teams.insertMany(data.data);
        return res.json({
            status: true,
            message: "Teams added Succesfully"
        });
    } catch (err) {
        return next(new InternalServerError())
    }
};

module.exports = {
    saveTeamsController
};