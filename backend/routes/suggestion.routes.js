const SuggestionController = require('../controllers/suggestion.controller');
// ...
module.exports = (app) => {
app.post('/api/suggestions/create', SuggestionController.createSuggestion);
app.get('/api/suggestions/getall', SuggestionController.getAllSuggestion);
app.put('/api/suggestions/update', SuggestionController.updateSuggestion);
app.delete('/api/suggestions/delete', SuggestionController.deleteSuggestion);
}
