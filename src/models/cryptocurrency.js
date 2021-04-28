const mongoose = require('mongoose');

const CryptocurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Cryptocurrency = mongoose.model('Cryptocurrency', CryptocurrencySchema, 'Cryptocurrency')

module.exports = Cryptocurrency;