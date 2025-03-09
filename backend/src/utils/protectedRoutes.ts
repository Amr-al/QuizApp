import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "./catchAsync";
import AppError from "./appError";
import User from "../models/userModel";
import mongoose from "mongoose";
// REACT_APP_
export const isLogin = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    // extract token from headers
    const token = req.headers['authorization'];
    // checking if the token is exist
    if (!token) {
        return next(new AppError('Please, Login and try again', 400));
    }
    // verify if the token is valid
    let user: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (!user) {
        return next(new AppError('Expired token!', 400));
    }
    // checking if the id is correct and exist
    const id: string = user.id;
    if (!id || !mongoose.isValidObjectId(id)) {
        return next(new AppError('No such User exists', 404));
    }
    // getting user data and check if it is valid
    user = await User.findById(id);
    if (!user) {
        return next(new AppError('User does not exist', 400));
    }
    // passing the user data to the header
    req.user = user;
    // move to the next middelware
    next();
})
