const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    email: {
        type: String,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        // Regex pattern for email validation
    },
    
    homeClinic: {
        type: String,
        enum: ['Concord', 'Campbell', 'Redwood City', 'San Francisco', 'Dublin'],
        },
        pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
}, { timestamps: true });
module.exports = mongoose.model('Owner', OwnerSchema);