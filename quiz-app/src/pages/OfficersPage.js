import React from "react";
import Header from "../components/headers/Header";
import Officers from "../components/info/Officers";
export default function OfficersPage() {

    return (
        <div className="flex flex-col bg-[#F1F1F1] min-h-screen min-w-screen" dir="rtl">
            <Header />
            <Officers />
        </div>
    );
}
