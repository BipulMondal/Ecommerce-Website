const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: "",
    },
    landmark: {
        type: String,
        default: "",
    },
    pin: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    }
})


exports.User = mongoose.model("User", userSchema)
exports.userSchema = userSchema