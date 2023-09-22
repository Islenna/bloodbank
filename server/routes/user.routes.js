const {authenticate} = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    // User routes
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.post('/api/users/register', UserController.register);
    app.get('/api/users/loggedin', UserController.getLoggedInUser);
    app.get('/api/users', authenticate, UserController.getAll);
    app.delete('/api/users/:id', authenticate, UserController.delete);
}
