import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { correctPassword, generateToken, hashPassword } from "../utils/helpers";
import mongoose from "mongoose";
import Quiz from "../models/quizModel";

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // extracting data from request body
    const { name, password } = req.body;
    // validate the input data
    if (!name) return next(new AppError("من فضلك ادخل الرقم الاسم", 400));
    if (!password) {
      return next(new AppError("من فضلك ادخل الرقم السري", 400));
    }
    // getting user data except user's password
    const user: any = await User.findOne({ name }).select("+password");
    if (!user) {
      return next(new AppError("الرقم السري او الاسم غير صحيح", 400));
    }
    // check if the entered password is correct
    const correct: Boolean = await correctPassword(
      password,
      user?.password || ""
    );
    if (!correct) {
      return next(new AppError("الرقم السري او الاسم غير صحيح", 401));
    }
    // returing the token if the data is correct
    const token = generateToken({
      id: user._id,
      name: user.name,
      role: user.role
    });

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // extracting data from request body
    let { name, password, role, milNumber, rank, weapon } = req.body;
    password = '123';
    // checking if username is exist
    let check = await User.findOne({ name });
    if (check) {
      return next(new AppError("اسم المستخدم موجود بالفعل", 400));
    }

    // preparing the remainingQuestions
    let nafsy = await Quiz.find({ weapon: "نفسي" });
    let weaponQuestions = await Quiz.find({ weapon });
    const remainingQuestions = nafsy.concat(weaponQuestions);

    // encrpyt user's password
    let hashedPassword = await hashPassword(password || "");

    // creating the new user
    const user = await User.create({ name, password: password ? hashedPassword : undefined, role:'admin', milNumber, rank, weapon, remainingQuestions });

    // returing the token if the data is correct
    const token = generateToken({
      id: user._id,
      name: user.name,
      role: user.role,
      weapon,
      rank
    });

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // getting the top 100 users
  const users = await User.find({ role: 'user' }).sort({ createdAt: -1 }).limit(100);
  res.status(200).json({
    status: 'success',
    result: users
  })
})

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  // checking if the id is valid and exist
  if (!id || !mongoose.isValidObjectId(id)) {
    return next(new AppError('Invalid User', 400));
  }
  const user = await User.findById(id);
  res.status(200).json({
    status: 'success',
    result: user
  });
})
