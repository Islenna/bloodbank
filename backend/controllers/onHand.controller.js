const OnHand = require('../models/onHand.model');

module.exports.createInventory = (req, res) => {
    console.log('Adding bag to inventory:', req.body);
    OnHand.create(req.body)
        .then(onHand => res.json(onHand))
        .catch(err => res.status(400).json(err));
}

module.exports.getAll = (req, res) => {
    OnHand.find({})
        .then(onHand => res.json(onHand))
        .catch(err => res.json(err));
}

module.exports.getAllCurrent = (req, res) => {
    OnHand.find({ isDeleted: false })
        .then(onHand => res.json(onHand))
        .catch(err => res.json(err));
}


module.exports.getOne = (req, res) => {
    OnHand.findOne({ _id: req.params.id })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => res.json(err));
}

module.exports.updateCrossmatchHistory = (req, res) => {
    const { id } = req.params;
    const { crossmatchHistory, homeClinic, onHold } = req.body;

    OnHand.findById(id)

        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Inventory item not found' });
                
            }
            item.crossmatchHistory = crossmatchHistory;
            item.homeClinic = homeClinic;
            item.onHold = onHold;

            return item.save();

        })
        .then((updatedItem) => {
            res.json(updatedItem);
        })
        .catch((err) => {
            console.error(err);

            res.status(500).json({ message: 'Server error' });
        });
};

module.exports.getByClinic = (req, res) => {
    const { homeClinic } = req.params;
    console.log('homeClinic:', homeClinic);

    OnHand.find({ homeClinic })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
}

module.exports.updateBloodOnHand = (req, res) => {
    const { id } = req.params;
    const { isOnHold } = req.body;

    OnHand.findById(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }

            item.onHold = isOnHold;
            return item.save();
        })
        .then((updatedItem) => {
            res.json(updatedItem);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
}


module.exports.delete = (req, res) => {
    const { id } = req.params;

    OnHand.findByIdAndRemove(id)
        .then(deletedBlood => {
            if (!deletedBlood) {
                return res.status(404).json({ message: 'Blood inventory not found' });
            }
            res.json(deletedBlood);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports.getByClinic = (req, res) => {
    const { homeClinic } = req.params;
    console.log('homeClinic:', homeClinic);

    OnHand.find({ homeClinic })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports.getByClinicAndBloodType = (req, res) => {
    const { homeClinic, bloodType } = req.params;

    OnHand.find({ homeClinic, bloodType })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports.transfused = (req, res) => {
    const { id } = req.params;
    const { consumptionType, recipient, patientID, patientName, patientLastName, transferredTo, transferredBy } = req.body;

    OnHand.findById(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }

            item.isDeleted = true;
            item.deletedAt = new Date();
            item.consumptionType = consumptionType;

            if (consumptionType === 'Successfully Transfused') {
                item.recipient = recipient;
                item.patientID = patientID;
                item.patientName = patientName;
                item.patientLastName = patientLastName;
            }
            if (consumptionType === 'Transferred') {
                item.transferredTo = transferredTo;
                item.transferredBy = transferredBy;
            }

            return item.save();
        })
        .then((updatedItem) => {
            res.json(updatedItem);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports.getConsumed = (req, res) => {
    OnHand.find({ isDeleted: true })

        .then((consumedItems) => {
            res.json(consumedItems);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};


module.exports.getConsumedOne = (req, res) => {
    OnHand.findOne({ _id: req.params.id })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => res.json(err));
};


module.exports.getTotalVolumeUsedByClinic = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const totalVolume = await OnHand.aggregate([
            {
                $match: {
                    consumedAt: { $gte: thirtyDaysAgo },
                },
            },
            {
                $group: {
                    _id: '$consumptionType',
                    totalVolumeUsed: { $sum: { $toInt: { $replaceOne: { input: '$unitSize', find: 'mL', replacement: '' } } } },
                },
            },
        ]);

        const totalVolumeByType = {};

        totalVolume.forEach((result) => {
            totalVolumeByType[result._id] = result.totalVolumeUsed;
        });

        res.json(totalVolumeByType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

