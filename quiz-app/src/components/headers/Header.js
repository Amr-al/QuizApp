import React, { useEffect, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import style from '../../styles/logoStyle.module.css'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [seconds, setSeconds] = useState(sessionStorage.getItem('timer')); // 20 minutes in seconds
    const [display, setDisplay] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setDisplay(sessionStorage.getItem('display'))
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 1) {
                    clearInterval(interval);
                    return 0; // Stop at 0
                }
                sessionStorage.setItem('timer',prevSeconds - 1)
                return prevSeconds - 1;
            });
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handleClick= ()=>{
        navigate('/')
    }
    //021522

   
    return (
        <div className="flex justify-between pr-4 pl-6 items-center h-fit py-2 w-screen bg-[#03346E] ">
            <img alt="logo" src="/logo.png" className={`${style.slidecaption} w-14 h-auto rounded-full `} onClick={handleClick}/>
            {display === 'true' && <div className="mb-1 relative w-40 bg-white h-14 border-4 border-white rounded-full flex flex-col justify-center items-center">
                <div className="absolute text-center text-3xl font-bold text-blue-600">
                    {formatTime(seconds)}
                </div>
            </div>}
            {display === 'false' && <p className="text-2xl text-white text-center" style={{ textWrap: 'balance' }} >منظومة الاختبارات / فرع شئون الضباط</p>}
            <img alt="logo" src="/logo.png" className={`${style.slidecaption} w-14 h-auto rounded-full `} />
        </div>

    );
}