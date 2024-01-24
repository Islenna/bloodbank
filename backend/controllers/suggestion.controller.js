const Suggestion = require('../models/suggestion.model');

const createSuggestion = async (req, res) => {
    try {
        const newSuggestion = new Suggestion({ 
            message: req.body.message,
            user: req.user.id  // Assuming you have user information in request
        });
        await newSuggestion.save();
        res.json({ message: "Suggestion added successfully", suggestion: newSuggestion });
    } catch (error) {
        res.status(400).json(error);
    }
};

// Other functions like getSuggestions, deleteSuggestion, etc.

module.exports = {
    createSuggestion,
    // other functions
};
