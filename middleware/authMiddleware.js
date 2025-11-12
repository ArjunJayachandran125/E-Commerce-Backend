import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 

export const protect = asyncHandler(async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("Unauthorized user");
    }
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = User.findById(decoded.id).select("-password");
    if(!req.user){
        res.status(401);
        throw new Error("Unauthorized user");
    }
    next();
});