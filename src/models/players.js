const mongoose = require('mongoose');

const playerSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        country_id: {
            type: Number,
            ref: "countries"
        },
        national_team: {
            type: Boolean,
            required: false
        },
        firstname: {
            type: String
        },
        lasname: String,
        gender: String,
        dateofbirth: String,
        battingStyle: String,
        bowlingStyle: String,
        position: Object,
        fullname: {
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

const Players = mongoose.model('Players', playerSchema);
module.exports = { Players }
