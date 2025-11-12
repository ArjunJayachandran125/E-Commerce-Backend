import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { userLoginCheck, userRegCheck } from '../utils/validation.js';

// @desc User Signup
// @route POST api/users/signup
// @access Public
export const userSignup = asyncHandler(async(req,res) => {
    const { error, value } = userRegCheck.validate(req.body);
    if(error){
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const { name, email, password } = value;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        res.status(400);
        throw new Error("This email is already in use proceed to login");
    }
    const user = await User.create({
        name,
        email,
        password
    });

    res.status(201).json({
        message: "User has been created",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

// @desc User Login
// @route POST api/users/login
// @access Public
export const userLogin = asyncHandler(async(req,res) => {
    const { error, value } = userLoginCheck.validate(req.body);
    if(error){
        res.status(400);
        throw new Error(error.details[0].message);
    }
    const { email, password } = value;
    const user = await User.findOne({ email });
    if(user && await user.comparePassword(password)){
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
            {id: user._id},
            jwtSecret,
            {expiresIn: process.env.JWT_EXPIRY}
        );
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } else {
        res.status(401);
        throw new Error("Incorrect credentials");
    }
});