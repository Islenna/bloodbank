const SuggestionController = require('../controllers/suggestion.controller');
// ...
module.exports = (app) => {
app.post('/api/suggestion', SuggestionController.createSuggestion);
app.get('/api/suggestion', SuggestionController.getAllSuggestion);
app.put('/api/suggestion/update', SuggestionController.updateSuggestion);
app.delete('/api/suggestion/delete/:id', SuggestionController.deleteSuggestion);
}
