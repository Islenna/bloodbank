const {authenticate} = require('../config/jwt.config');
const BloodOnHandController = require('../controllers/onHand.controller');

module.exports = (app) => {
    //Inventory routes
    app.get('/api/inventory', authenticate, BloodOnHandController.getAll);
    app.get('/api/inventory/active', authenticate, BloodOnHandController.getAllCurrent);
    app.get('/api/inventory/:id', authenticate, BloodOnHandController.getOne);
    app.post('/api/inventory', authenticate, BloodOnHandController.createInventory);
    app.put('/api/inventory/:id', authenticate, BloodOnHandController.updateBloodOnHand);
    app.delete('/api/inventory/:id', authenticate, BloodOnHandController.delete);
    app.get('/api/inventory/search/:homeClinic', authenticate, BloodOnHandController.getByClinic);
    app.get('/api/inventory/search/:homeClinic/:bloodType', authenticate, BloodOnHandController.getByClinicAndBloodType);
    app.put('/api/inventory/consume/:id', authenticate, BloodOnHandController.transfused);
    app.put('/api/inventory/notes/:id', authenticate, BloodOnHandController.updateCrossmatchHistory);

    //Analytics routes
    app.get('/api/consumed', BloodOnHandController.getConsumed);
    app.get('/api/consumed/:id', authenticate, BloodOnHandController.getConsumedOne);
    app.delete('/api/consumed/:id', authenticate, BloodOnHandController.delete);


};