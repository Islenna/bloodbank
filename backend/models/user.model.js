const bcrypt = require("bcrypt");
const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@SageCentersTest\.com)?$/.test(val),
            message: "Please enter a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema);
