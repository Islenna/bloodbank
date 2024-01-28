const {authenticate} = require('../config/jwt.config');
const SuggestionController = require('../controllers/suggestion.controller');
const { checkRole } = require('../middleware/roleCheck');

module.exports = (app) => {
app.post('/api/suggestion', SuggestionController.createSuggestion);
app.get('/api/suggestion', authenticate,checkRole(['admin']), SuggestionController.getAllSuggestion);
app.put('/api/suggestion/update', SuggestionController.updateSuggestion);
app.delete('/api/suggestion/delete/:id',authenticate,checkRole(['admin']), SuggestionController.deleteSuggestion);
}
