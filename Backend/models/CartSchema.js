const mongoose = require ("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productId: {
      type: String,
      required:true
    },
    name: {
        type: String,
        required: true,
    },
      color: {
        type: String,
        required: true,
    },
      amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
      type: String,
      required: true
    }
 
})

exports.CartItem = mongoose.model("CartItem", cartSchema)