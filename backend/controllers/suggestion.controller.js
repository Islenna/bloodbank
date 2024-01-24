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

const getAllSuggestion = (req, res) => {
    Suggestion.find({})
        .then(suggestions => res.json(suggestions))
        .catch(err => res.json(err));
}

const getOneSuggestion = (req, res) => {
    Suggestion.findOne({ _id: req.params.id })
        .then(suggestion => {
            res.json(suggestion);
        })
        .catch(err => res.json(err));
}

const updateSuggestion = (req, res) => {
    Suggestion.findOneAndUpdate({ _id: req.params.id }, request.body, {new: true })
        .then(updatedSuggestion => res.json(updatedSuggestion))
        .catch(err => res.json(err));
}

const deleteSuggestion = (req, res) => {
    Suggestion.deleteOne({ _id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}

module.exports = {
    createSuggestion,
    getAllSuggestion,
    getOneSuggestion,
    updateSuggestion,
    deleteSuggestion
};
