const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { Players } = require("../models/players");
const { SportMonks } = require("../services/sportmonks")

const Api = new SportMonks();

const savePlayersController = async (req, res, next) => {
    try {
        const { data } = await Api.getPlayers();
        await Players.insertMany(data.data);
        return res.json({
            status: true,
            message: "Players added Succesfully"
        });
    } catch (err) {
        console.log(err);
        return next(new InternalServerError())
    }
};

module.exports = {
    savePlayersController
};