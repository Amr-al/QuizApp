import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Quiz from "../models/quizModel";
import Answer from "../models/answerModel";
import User from "../models/userModel";

export const addQuestion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const question = await Quiz.create(req.body);
    return res.status(200).json({
        status: 'success',
        result: question
    });
})

export const getQuestions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const weapon = req.params.weapon;
    let result = await Quiz.find({ weapon: 'نفسي' });
    let temp: any = []
    if (weapon != "نفسي") {
        temp = await Quiz.find({ weapon });
    }
    result = result.concat(temp);
    return res.status(200).json({
        status: 'success',
        result
    })
})

export const addAnswer = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const answer = await Answer.create(req.body);
    const id = req.user._id;
    const user = await User.findById(id);


    let temp = user?.remainingQuestions.filter((question) => {
        return question._id != req.body.questionId;
    })
    await User.findByIdAndUpdate(id, { remainingQuestions: temp });

    return res.status(200).json({
        status: 'success',
        result: answer
    })
})

export const getAnswers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const answer = await Answer.find({ userId: id }).populate('userId').populate('questionId').sort({ "questionId.createdAt": -1 });
    return res.status(200).json({
        status: 'success',
        result: answer
    })
})


export const getQuestionById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})