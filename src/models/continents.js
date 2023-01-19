const mongoose = require('mongoose');

const continentSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Continent = mongoose.model('Continent', continentSchema);

module.exports = { Continent }