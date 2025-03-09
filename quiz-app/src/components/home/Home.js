import React, { useEffect } from "react";
import style from '../../styles/logoStyle.module.css'

export default function Home() {
    useEffect(() => {
        sessionStorage.setItem('display', false)
    }, [])
    return (
        <div className="flex flex-col w-fit mx-auto mt-4 gap-3">
            <img alt="logo" src="/logo.png" className={`${style.slidecaption} rounded-full w-40 mx-auto `} />

            <h1 className="text-2xl font-semibold mb-10">مرحبا بك في منظومة الاختبارات</h1>
            <button type="button" onClick={() => window.location.replace('/start')}
                className="bg-[#03346E] rounded p-3 text-white font-bold transition-all duration-300 transform hover:scale-105" >بداية اختبار</button>
            <button type="button" onClick={() => window.location.replace('/add')}
                className="bg-[#03346E] rounded p-3 text-white font-bold transition-all duration-300 transform hover:scale-105" >اضافة سؤال </button>
            <button type="button" onClick={() => window.location.replace('/officers')}
                className="bg-[#03346E] rounded p-3 text-white font-bold transition-all duration-300 transform hover:scale-105" >عرض بيانات المختبرين</button>
            <button type="button" onClick={() => { sessionStorage.clear(); window.location.replace('/signin') }}
                className="bg-red-700 rounded p-3 text-white font-bold transition-all duration-300 transform hover:scale-105" >تسجيل الخروج</button>

        </div>

    );
}
