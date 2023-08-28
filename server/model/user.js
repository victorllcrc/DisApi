const mongoose = require('mongoose');
const Lodging = require('./lodging');
const Booking = require('./booking');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lodgings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lodging' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;