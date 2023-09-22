const Owner = require('../models/owner.model');
const Pet = require('../models/pet.model')

module.exports.index = (request, response) => {  
    response.json({
        message: "Hello World"
    });
}

module.exports.createOwner = (req, res) => {
    Owner.create(req.body)
        .then(owner => res.json(owner))
        .catch(err => res.status(500).json(err));
}

module.exports.getAll = (req, res) => {
    Owner.find({})
        .then(owners => res.json(owners))
        .catch(err => res.json(err));
}

module.exports.getOne = (req, res) => {
    Owner.findOne({ _id: req.params.id })
        .then(owner => res.json(owner))
        .catch(err => res.json(err));
}

module.exports.updateOwner = (request, response) => {
    Owner.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedOwner => response.json(updatedOwner))
        .catch(err => response.json(err))
}

module.exports.delete = (req, res) => {
    Owner.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}

module.exports.getByClinic = (req, res) => {
    Owner.find({ homeClinic: req.params.homeClinic }).exec()
        .then((owners) => res.json(owners))
        .catch((err) => res.json(err))

}

module.exports.clinicSearch = (req, res) => {
    Pet.find({ homeClinic: req.params.homeClinic, bloodType: req.params.bloodType, lastDonated: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }).exec()
        .then((pets) => res.json(pets))
        .catch((err) => res.json(err))
}

module.exports.clinicSearch = (req, res) => {
    Owner.find({ homeClinic: req.query.homeClinic })
        .then((owners) => {
            Pet.find({ owner: { $in: owners } })
                .then((pets) => {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    const filteredPets = pets.filter(
                        (pet) =>
                        pet.bloodType === req.query.bloodType &&
                        (pet.lastDonated < thirtyDaysAgo || !pet.lastDonated) &&
                        pet.labworkStatus === 'Complete'
                    );
                    res.json(filteredPets);
                })
                .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
};

module.exports.deleteOwnerAndPets = (req, res) => {
    const ownerId = req.params.id;

    Pet.deleteMany({ owner: ownerId })
        .then(() => {
            return Owner.deleteOne({ _id: ownerId });
        })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}