const {authenticate} = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');
const { checkRole } = require('../middleware/roleCheck');

module.exports = (app) => {
    // User routes
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.post('/api/users/register', UserController.register);
    app.get('/api/users/loggedin', UserController.getLoggedInUser);
    app.put('/api/users/:id/role', authenticate, checkRole(['admin']), UserController.update);
    app.get('/api/users', authenticate, checkRole(['admin']), UserController.getAll);
    app.delete('/api/users/:id', authenticate,checkRole(['admin']), UserController.delete);
}
