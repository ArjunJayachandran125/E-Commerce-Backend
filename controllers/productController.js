import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { allProductsCheck, productCreate, updateProductCheck } from '../utils/validation.js';
import multer from 'multer';
import storage from '../middleware/multer.js';

const upload = multer({ storage });

// @desc Create Product
// @route POST api/products/
// @access Private
export const createProduct = asyncHandler(async (req, res) => {
    const { error, value } = productCreate.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const { name, description, company, price, stock } = value;

    const fileName = req.file ? req.file.filename : null;

    const product = await Product.create({
        name,
        description,
        company,
        price,
        stock,
        file: fileName,         
        user: req.user._id
    });

    res.status(201).json({
        message: "Product created successfully",
        product
    });
})

// @desc Get all products
// @route GET api/products/
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
    const { error, value } = allProductsCheck.validate(req.query);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const { name, company, page, limit, sort } = value;

    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (company) filter.company = new RegExp(company, 'i');

    const skip = (page - 1) * limit;
    const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

    res.status(200).json({
        message: "All products fetched",
        total,
        page,
        pages: Math.ceil(total / limit),
        count: products.length,
        products
    });
});

// @desc Get product by ID
// @route GET api/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("This product does not exist");
    }
    res.status(200).json({
        message: "Product fetched successfully",
        product
    });
});


// @desc Update product
// @route PUT api/products/:id
// @access Private
export const updateProduct = asyncHandler(async (req, res) => {
    const { error, value } = updateProductCheck.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const { name, description, company, price, stock } = value;

    const fileName = req.file ? req.file.filename : undefined; 
    const updateData = {
        name,
        description,
        company,
        price,
        stock,
    };

    if (fileName) updateData.file = fileName; 

    const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        updateData,
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        res.status(404);
        throw new Error("This product does not exist or user unauthorized");
    }

    res.status(200).json({
        message: "Product updated successfully",
        updatedProduct
    });
});


// @desc Delete product
// @route DELETE api/products/:id
// @access Private
export const deleteProduct = asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });

    if (!deletedProduct) {
        res.status(404);
        throw new Error("This product does not exist or user unauthorized");
    }

    res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct
    });
});