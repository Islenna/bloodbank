const OwnerController = require('../controllers/owner.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    
    // Owner routes
    app.get('/api/owners',authenticate, OwnerController.getAll);
    app.post('/api/owners/new',authenticate, OwnerController.createOwner);
    app.get('/api/owners/search',authenticate, OwnerController.clinicSearch);
    app.get('/api/owners/:id',authenticate, OwnerController.getOne);
    app.put('/api/owners/:id',authenticate, OwnerController.updateOwner);
    app.delete('/api/owners/:id',authenticate, OwnerController.deleteOwnerAndPets);
    app.get('/api/owners/search/:homeClinic',authenticate, OwnerController.getByClinic);
    
    
};
