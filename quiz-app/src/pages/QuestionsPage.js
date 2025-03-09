import React from "react";
import Questions from "../components/quiz/Questions";
import Header from "../components/headers/Header";
export default function QuestionsPage() {

    return (
        <div className="flex flex-col bg-[#F1F1F1] min-h-screen min-w-screen" dir="rtl">
            <Header />
            <Questions />
        </div>

    );
}
