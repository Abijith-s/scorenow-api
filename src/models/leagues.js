const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        season_id: {
            type: String,
            required: true
        },
        country_id: {
            type: Number,
            ref: "countries"
        },
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: false
        },
        image_path: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Leagues = mongoose.model('Leagues', leagueSchema);

module.exports = { Leagues }