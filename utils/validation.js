import Joi from 'joi';

export const userRegCheck = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const userLoginCheck = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const productCreate = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(10).required(),
    company: Joi.string().required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().default(0).required()
});

export const allProductsCheck = Joi.object({
    name: Joi.string(),
    company: Joi.string(),
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).default(10),
    sort: Joi.string().valid("name", "-name", "company", "-company")
});

export const updateProductCheck = Joi.object({
    name: Joi.string(),
    description: Joi.string().min(10),
    company: Joi.string(),
    price: Joi.number().min(0),
    stock: Joi.number().default(0)
})

export const createOrderCheck = Joi.object({
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).default(1)
        })
    ).min(1).required()
});