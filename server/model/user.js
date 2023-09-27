const mongoose = require('mongoose');
const Lodging = require('./lodging');
const Booking = require('./booking');
const bcrypt = require('bcrypt');

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

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

const User = mongoose.model('User', userSchema);

module.exports = User;