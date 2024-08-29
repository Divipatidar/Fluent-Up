const mongoose = require('mongoose');

const UserHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    history: [String],  // Store user history as an array of strings
});

module.exports = mongoose.model('UserHistory', UserHistorySchema);
