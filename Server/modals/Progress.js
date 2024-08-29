const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        enum: ['beginner', 'conversational', 'fluent'],
        default: 'beginner'
    },
    progress: {
        type: Number,  // Could represent completion percentage
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserProgress', UserProgressSchema);
