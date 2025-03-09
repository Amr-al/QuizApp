import React from "react";
import MultiInputForm from "../components/forms/MultiInputForm ";
import Header from "../components/headers/Header";
export default function AddQuestionPage() {

    return (
        <div className='flex flex-col'>
            <Header />
            <MultiInputForm />
        </div>
    );
}
