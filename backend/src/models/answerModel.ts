import mongoose from 'mongoose';

// Define the schema for the Answer model
const answerModel = new mongoose.Schema(
    {
        userId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId, // Reference to User model
            ref: 'User', // Assuming you have a User model
        },
        questionId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId, // Reference to Quiz model
            ref: 'Quiz', // Referencing the Quiz schema
        },
        answer: {
            required: true,
            type: String
        },
    },
    {
        timestamps: true, // Store when the answer was submitted
    }
);

// Create the Answer model
const Answer = mongoose.model('Answer', answerModel);

// Add an index for querying answers more efficiently by userId and quizId
answerModel.index({ userId: 1, quizId: 1 });

export default Answer;