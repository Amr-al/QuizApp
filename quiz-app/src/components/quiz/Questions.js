import React, { useEffect, useState } from "react";
import style from '../../styles/custom-progress.module.css'
import { useNavigate } from "react-router-dom";
import { addAnswer, getQuestions, getUserById } from "../../config/apiConfig";
import { jwtDecode } from "jwt-decode";
import TrueFalseQuesion from '../questions/TrueFalseQuestion'
export default function Questions() {
    const [check, setCheck] = useState(-1);
    const [index, setIndex] = useState(1)
    const [choice, setChoice] = useState(-1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questions, setQuestions] = useState();
    const [length, setLength] = useState(0)

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer.option);
    };

    const toggleCheck = (KEY) => {
        setCheck(KEY);
    }

    const navigate = useNavigate();

    const getData = async () => {
        const id = jwtDecode(sessionStorage.getItem('auth')).id;
        let res = await fetch(`${getUserById + id}`);
        res = await res.json();
        setQuestions(res.result.remainingQuestions);
        if (!sessionStorage.getItem('numberOfQuestions')) {
            sessionStorage.setItem('numberOfQuestions', res.result.remainingQuestions.length)
        }
        setLength(sessionStorage.getItem('numberOfQuestions'))
    }

    useEffect(() => {
        sessionStorage.setItem('display', true);
        getData();
    }, [])

    const handleClick = () => {
        setCheck(-1);
        setChoice(-1);
        setSelectedAnswer();
        if (index < questions.length) {
            setIndex(index => index + 1)
        } else {
            navigate('/end')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            alert('من فضلك ادخلك الاجابة');
            return
        }
        const userId = jwtDecode(sessionStorage.getItem('auth')).id;
        const res = await fetch(addAnswer, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem('auth')
            },
            body: JSON.stringify({
                userId,
                questionId: questions[index - 1]._id,
                answer: selectedAnswer
            })
        })
        if (res.ok) {
            handleClick();
        }
    }
    return (
        <>
            <div className="mr-8 items-center border-2 bg-blue-100 border-gray-200 w-fit mt-6 mr-4 p-2 rounded-lg flex gap-2">
                <h1 className="text-2xl font-bold">فرع شئون ضباط / هيئة الاستخبارات يرحب بكم !</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-[25%] lg:mr-8 mt-8 lg:mr-0 mr-4">
                <div className="flex flex-col mr-8 mb-2">
                    <p className="text-gray-600 mb-3">السؤال رقم : {index} / {length}</p>
                    <p className="text-lg lg:text-2xl w-[400px] mb-40" style={{ textWrap: 'balance' }}>{questions ? questions[index - 1]?.question : ""}</p>
                    <progress value={index} max={questions?.length} className={`${style.customprogress}`} />
                </div>

                {(questions && questions[index - 1].type == 'اختياري') &&
                    <div className="flex flex-col justify-around lg:justify-between gap-2 lg:ml-2 mr-4 lg:mt-0 mt-6 w-[80%] md:w-[35%]">
                        {questions[index - 1].options.map((q, key) => {
                            if (choice === key || check === key) {
                                return <div key={key} onClick={() => { setChoice(key); handleAnswer(q); }} onMouseEnter={() => { toggleCheck(key) }} onMouseLeave={() => { toggleCheck(-1) }} className={`drop-shadow-xl bg-white py-2 text-xl border-[2px] rounded-xl px-6 flex gap-2 items-center transition duration-200 cursor-pointer border-green-600 `}>
                                    <p className={`bg-gray-400 rounded-xl py-2 px-3 bg-green-400 text-white`}>{key + 1}</p>
                                    <p>{q.option}</p>
                                </div>
                            } else {
                                return <div key={key} onClick={() => { setChoice(key); handleAnswer(q); }} onMouseEnter={() => { toggleCheck(key) }} onMouseLeave={() => { toggleCheck(-1) }} className={`drop-shadow-xl bg-white py-2 text-xl border-[2px] rounded-xl px-6 flex gap-2 items-center transition duration-200 cursor-pointer  `}>
                                    <p className={`bg-gray-400 rounded-xl py-2 px-3`}>{key + 1}</p>
                                    <p>{q.option}</p>
                                </div>
                            }
                        })}
                        <button onClick={handleSubmit} type="submit" className="w-full bg-[#03346E] transition duration-200 hover:bg-[#134B70] py-3 px-4 text-white mt-4  mx-auto rounded-lg">
                            {index === questions.length ? "نهاية الاختبار" : "السؤال التالى"}
                        </button>
                    </div>
                }

                {(questions && questions[index - 1].type !== 'اختياري') && <div className="flex flex-col justify-around lg:justify-between gap-2 ml-2 w-fit md:w-[35%]">
                    <TrueFalseQuesion onAnswer={handleAnswer} />
                    <button onClick={handleSubmit} type="submit" className="w-full bg-[#03346E] transition duration-200 hover:bg-[#134B70] py-3 px-4 text-white mt-4  mx-auto rounded-lg">
                        {index === questions.length ? "نهاية الاختبار" : "السؤال التالى"}
                    </button>
                </div>}
            </div>
        </>
    );
}
