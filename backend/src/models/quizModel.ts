import mongoose from "mongoose";

// Define the schema for the Quiz model
const quizModel = new mongoose.Schema(
    {
        type: {
            required: true,  // This field is required
            type: String,    // Type should be a string
        },

        weapon: {
            required: true,  // This field is required
            type: String     // Weapon should be a string, representing the weapon's name or type
        },

        question: {
            required: true,  // This field is required
            type: String,    // Question should be a string
        },

        options: [Object],  // This is an array of strings, each representing an answer option


    },
    {
        // Mongoose will automatically add `createdAt` and `updatedAt` fields to the document
        timestamps: true,  // This is optional, but useful for tracking when each quiz question was created/modified
    }
);

// Create a Mongoose model from the schema
const Quiz = mongoose.model("Quiz", quizModel);

// Export the Quiz model to use in other parts of the app
export default Quiz;
