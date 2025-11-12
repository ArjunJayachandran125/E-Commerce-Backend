import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { createOrderCheck } from "../utils/validation.js";

// @desc Create an Order
// @route POST api/orders/
// @access Private
export const createOrder = asyncHandler(async(req,res) => {
    const { error, value } = createOrderCheck.validate(req.body);
    if(error){
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const { products } = value;

    const productDetails = await Product.find({
        _id: { $in : products.map(p => p.productId) }
    });
    if(productDetails.length !== products.length){
        res.status(400);
        throw new Error("One or more products dont exist");
    }

    let totalPrice = 0;
    const orderProducts = products.map(p => {
        const prod = productDetails.find(x => x._id.equals(p.productId));
        const price = prod.price * p.quantity;
        totalPrice += price;
        return {
            productId: prod._id,
            name: prod.name,
            quantity: p.quantity,
            price
        }
    });
    const order = await Order.create({
        user: req.user._id,
        products: orderProducts,
        totalPrice
    });
    res.status(201).json({
        message: "Order has been created",
        order,
    });
});

// @desc Get order with id
// @route GET api/orders/:id
// @access Private
export const getOrder = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        res.status(404);
        throw new Error("Order with this id not found");
    }
    res.status(200).json({
        message: "Order fetched successfully",
        order
    });
});