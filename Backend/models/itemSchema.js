const mongoose = require ("mongoose");

const orderItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "quantity can not be less than 1"]
    },
},
{
    timeStamps: true
}
);

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema)