const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
    {
        petName: { type: String },
        petType: {
            type: String,
            enum: ['Dog', 'Cat'],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
        },
        petDescription: { type: String },
        bloodType: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    if (this.petType === 'Dog' || this.petType === 'canine') {
                        return value === 'DEA 1.1 Positive' || value === 'DEA 1.1 Negative';
                    } else if (this.petType === 'Cat' || this.petType === 'feline') {
                        return value === 'A' || value === 'B' || value === 'AB';
                    }
                    return false;
                },
                message: 'Invalid bloodType for the given petType',
            },
        },
        lastDonated: { type: Date },
        labworkStatus: {
            type: String,
            enum: ['Incomplete', 'Pending', 'Complete'],
        },
        dateLabworkCompleted: { type: Date },
        homeClinic: { type: String },
    },
    { timestamps: true }
);

PetSchema.pre('findOne', function (next) {
    this.populate('owner', 'homeClinic');
    next();
});

module.exports = mongoose.model('Pet', PetSchema);
