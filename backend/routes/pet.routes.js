const {authenticate} = require('../config/jwt.config');
const PetController = require('../controllers/pet.controller');

module.exports = (app) => {
    // Pet routes
    app.get('/api/pets', PetController.getAll);
    app.post('/api/pets', PetController.createPet);
    app.get('/api/pets/:id', PetController.getOne);
    app.put('/api/pets/:id', PetController.updatePet);
    app.delete('/api/pets/:id', PetController.delete);
    app.delete('/api/pets/owner/:ownerId', PetController.deleteByOwner);
    app.get('/api/owners/:id/pets', PetController.getAllByOwner);
    app.get('/api/pets/strays', PetController.getStrayPets);
};