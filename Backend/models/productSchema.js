const mongoose = require ("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
       required: true
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    colors: [{
        type: String,
        // required: true,
    }],
    company: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true
    },
    countInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    star:{
        type: Number,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isAppliance: {
        type: Boolean,
        default: false,
    },
    isFootStyle : {
        type: Boolean,
        default: false,
    },
    isBeauty : {
        type: Boolean,
        default: false,
    },
    isBabyDiscount: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
   
})


exports.Product = mongoose.model("Product", productSchema);



