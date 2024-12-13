const mongoose = require('mongoose');

const productReviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

const ProductReview = mongoose.model('ProductReview',productReviewSchema);

module.exports = ProductReview;