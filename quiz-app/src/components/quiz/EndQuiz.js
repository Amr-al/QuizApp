import React, { useEffect } from "react";
import style from '../../styles/logoStyle.module.css'

export default function EndQuiz() {
    useEffect(() => {
        sessionStorage.setItem('display', false)
        setTimeout(() => {
            sessionStorage.clear();
            window.location.replace('/start')
        }, 3000)
    }, [])
    return (
        <div className="flex flex-col w-fit mx-auto mt-[7%] gap-3">
            <img alt="logo" src="/logo.png" className={`${style.slidecaption} rounded-full w-40 mx-auto `} />
            <h1 className="text-2xl font-semibold"> !شكرًا لك على إتمام الاختبار </h1>
            <h1 className="text-2xl font-semibold mx-auto">نتمنى لك كل التوفيق</h1>
        </div>
    );
}
