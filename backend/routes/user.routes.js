const {authenticate} = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');
const {isAdmin} = require('../middleware/rolecheck');

module.exports = (app) => {
    // User routes
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.post('/api/users/register', UserController.register);
    app.get('/api/users/loggedin', UserController.getLoggedInUser);
    app.get('/api/users', authenticate, isAdmin, UserController.getAll);
    app.delete('/api/users/:id', authenticate,isAdmin, UserController.delete);
}
