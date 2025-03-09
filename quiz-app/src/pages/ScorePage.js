import React from "react";
import Score from "../components/quiz/Score";
import Header from "../components/headers/Header";
export default function ScorePage() {

    return (
        <div className="flex flex-col bg-[#F1F1F1] min-h-screen min-w-screen" dir="rtl">
            <Header />
            <Score/>
        </div>

    );
}
