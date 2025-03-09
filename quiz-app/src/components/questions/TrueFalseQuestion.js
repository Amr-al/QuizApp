import React, { useState } from "react";

const TrueFalseQuesion = ({ onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswered(true);
        onAnswer(answer); // Callback function to notify parent about the answer
    };

    return (
        <div className="max-w-lg mx-auto w-full p-6 bg-white rounded-lg shadow-md space-y-6">
            <div className="flex flex-col justify-center gap-8 py-5">
                <button
                    onClick={() => handleAnswer("صح")}
                    className={`${selectedAnswer === "صح" && isAnswered
                        ? "bg-green-500 text-white"
                        : "bg-green-100 text-green-700"
                        } px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 transform hover:scale-105`}
                >
                    صح
                </button>
                <button
                    onClick={() => handleAnswer("غلط")}
                    className={`${selectedAnswer === "غلط" && isAnswered
                        ? "bg-red-500 text-white"
                        : "bg-red-100 text-red-700"
                        } px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 transform hover:scale-105`}
                >
                    غلط
                </button>
            </div>

        </div>
    );
};

export default TrueFalseQuesion;
