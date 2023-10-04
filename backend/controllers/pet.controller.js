const Pet = require('../models/pet.model.js');

module.exports.createPet = (req, res) => {
    console.log('Creating a new pet:', req.body);
    Pet.create(req.body)
        .then(pet => res.json(pet))
        .catch(err => res.status(400).json(err));
}

module.exports.getStrayPets = (req, res) => {
    console.log('Fetching stray pets...');

    Pet.find({ owner: null })
        .then((strayPets) => {
            console.log('Stray pets found:', strayPets);
            res.json(strayPets);
        })
        .catch((err) => {
            console.log('Error occurred while fetching stray pets:', err);
            res.status(500).json(err);
        });
};



module.exports.deleteByOwner = (req, res) => {
    Pet.deleteMany({ owner: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}




module.exports.getAll = (req, res) => {
    Pet.find({})
        .then(pets => res.json(pets))
        .catch(err => res.json(err));
}

module.exports.getOne = (req, res) => {
    Pet.findOne({ _id: req.params.id })
        .then(pet => {
            res.json(pet);
        })
        .catch(err => res.json(err));
};


module.exports.updatePet = (request, response) => {
    Pet.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedPet => response.json(updatedPet))
        .catch(err => response.json(err))
}

module.exports.delete = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}

module.exports.getAllByOwner = (req, res) => {
    Pet.find({ owner: req.params.id })
        .then(pets => res.json(pets))
        .catch(err => res.json(err));
}

