const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { Continent } = require("../models/continents");
const { SportMonks } = require("../services/sportmonks")

const Api = new SportMonks();

const saveContinentsController = async (req, res, next) => {
    try {
        let { data } = await Api.getContinents();
        await Continent.insertMany(data.data);
        return res.json({
            status: true,
            message: "Added continent Succesfully"
        });
        
    } catch (err) {
        return next(new InternalServerError());
    }
};

module.exports = {
    saveContinentsController
}