import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter user Id"]
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please enter the product id"]
        },
        name: {
            type: String,
            required: [true, "Please enter name of the product"]
        },
        quantity: {
            type: Number,
            required: [true, "Please enter the quantity you need"],
            default: 1
        },
        price: {
            type: Number,
            required: [true, "Please enter the price of the product"]
        }
    }], 
    totalPrice: {
        type: Number,
        required: true
    },
});

export default mongoose.model("Order", orderSchema);