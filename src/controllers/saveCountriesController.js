const { InternalServerError } = require("../middlewares/ErrorHandlers/error-handlers/internal-server-error");
const { Country } = require("../models/countries");
const { SportMonks } = require("../services/sportmonks")

const Api = new SportMonks();

const saveCountriesController = async (req, res, next) => {
    try {
        let { data } = await Api.getCountries();
        await Country.insertMany(data.data);
        return res.json({
            status: true,
            message: "Added countries Succesfully"
        });

    } catch (err) {
        console.log(err);
        return next(new InternalServerError());
    }
};

module.exports = {
    saveCountriesController
}