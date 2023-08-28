const mongoose = require('mongoose');
const User = require('./user');

const bookingSchema = new mongoose.Schema({
    userDueño: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userCliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: {
        type: Date,
        required:true
    },
    num_days: {
        type: Number,
        required:true
    },
    lodging: {
        name:String,
        location: String,
        num_rooms: Number
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;