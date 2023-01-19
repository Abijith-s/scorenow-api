const mongoose = require('mongoose');

const teamsSchema = mongoose.Schema(
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
            required: true
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


const Teams = mongoose.model('Teams', teamsSchema);
Teams.createIndexes({name: "text"})
module.exports = { Teams }