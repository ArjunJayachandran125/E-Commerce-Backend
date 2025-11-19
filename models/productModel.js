import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the product"],
    },
    description: {
        type: String,
        required: [true, "Please enter the description of your product"],
        minlength: 10
    },
    company: {
        type: String,
        required: [true, "Please enter the company name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of your item"],
        min: [0, "Price needs to be more than or equal to 0"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter the stock of this item"],
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Enter the user Id"]
    },
    file: {
        type: String,
    }
}, {timestamps: true});

productSchema.index({name: 1, company:1, user: 1}, {unique: true});

export default mongoose.model("Product", productSchema);