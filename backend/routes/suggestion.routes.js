const SuggestionController = require('../controllers/suggestion.controller');
// ...
module.exports = (app) => {
app.post('/api/suggestions/create', SuggestionController.createSuggestion);
// Other suggestion routes
}
