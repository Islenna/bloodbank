const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Message is required"],
        maxlength: [500, "Message cannot be more than 500 characters"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', SuggestionSchema);
