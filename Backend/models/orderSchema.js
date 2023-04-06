const mongoose = require ("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
       required: true
    },
    user: {
        name: {
            type: String,
            required: true
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
        
        street: {
            type: String,
            required: true
        },
        landmark: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    items: [],
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    totalPrice: {
        type: Number,
    },
    shipping_fee: {
        type: Number,
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
});


exports.Order = mongoose.model("Order", orderSchema)