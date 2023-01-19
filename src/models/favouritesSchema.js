const mongoose = require('mongoose');

const favouritesSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        players: {
            type: Array,
            required: true
        },
        teams: {
            type: Array,
            required: true
        },
        leagues: {
            type: Array,
            required: true
        }
    }
);

const Favourites = mongoose.model('favourites', favouritesSchema);

module.exports = { Favourites }