const mongoose = require('mongoose');

const countrySchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        continent_id: {
            type: Number,
            ref: "continents"
        },
        image_path: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Country = mongoose.model('Countries', countrySchema);

module.exports = { Country }