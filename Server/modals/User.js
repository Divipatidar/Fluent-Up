const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // Set to true if you want this field to be mandatory
    },
    lastName: {
        type: String,
        required: true // Set to true if you want this field to be mandatory
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', userSchema);
