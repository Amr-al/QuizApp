import React, { useEffect, useState } from "react";
import { getAnswers } from "../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function Results() {
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const navigate = useNavigate()
    const id = useParams().id;
    const getData = async () => {
        let res = await fetch(getAnswers + id);
        if (res.ok) {
            res = await res.json();
            setData(res.result);
        }
    }
    useEffect(() => {
        sessionStorage.setItem('display', false);
        setUser({
            name: sessionStorage.getItem('name'),
            milNumber: sessionStorage.getItem('milNumber'),
            weapon: sessionStorage.getItem('weapon')
        })
        getData();
    }, [])

    return (
        <>
            <div className="p-2 rounded bg-black w-fit text-white cursor-pointer ml-8 mt-2" onClick={() => navigate(-1)}> رجوع </div>
            <div className="flex justify-between px-4 mt-4 font-bold text-xl" dir="rtl">
                <p>{user?.name}</p>
                <p>{user?.milNumber}</p>
                <p>{user?.weapon}</p>

            </div>

            <div className="flex flex-col gap-3 pt-5 px-8 border-4 border-black mx-2 mt-4" dir="rtl">

                {data?.map((res, key) => {
                    return <div key={key}>
                        <div className="text-xl font-semibold border-[1px] border-black solid rounded-xl px-6 py-4">
                            <>{key + 1} - </>
                            السؤال: <>   </>
                            {res.questionId.question}
                        </div>
                        <div className={`text-xl pr-4 flex justify-between`}>
                            <div className="flex gap-2">
                                الاجابة: <></>
                                <p>{res.answer}</p>
                            </div>
                            <div className="border-2 border-black h-10 w-16 mt-2">
                            </div>
                        </div>
                    </div>
                })
                }
                <p className="pr-2 font-semibold text-red-600">التقييم</p>
                <div className="my-2 border-2 border-gray-400 min-h-[150px]">

                </div>
            </div>
        </>

    );
}