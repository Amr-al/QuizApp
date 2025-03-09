import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../config/apiConfig';
import { redirect, useNavigate } from 'react-router-dom';

const Officers = () => {
    const [data, setData] = useState();
    const navigate = useNavigate()

    const getUsers = async () => {
        const token = sessionStorage.getItem('auth');
        let res = await fetch(getAllUsers, {
            headers: {
                authorization: token
            }
        })
        if (res.ok) {
            res = await res.json();
            setData(res.result);
        }
    }

    const handleClick = (data, redirect) => {
        sessionStorage.setItem('name', data.name)
        sessionStorage.setItem('milNumber', data.milNumber)
        sessionStorage.setItem('weapon', data.weapon)
        navigate(`/${redirect}/${data._id}`);
    }

    useEffect(() => {
        sessionStorage.setItem('display', false);
        getUsers();
    }, [])
    return (
        <>
            <h1 className='text-center py-4 text-xl font-semibold mt-2'>بيانات الضباط </h1>
            <div className="overflow-x-auto mt-2 px-4">
                <div className="p-2 rounded bg-black w-fit text-white cursor-pointer ml-8 mb-2" onClick={() => navigate(-1)}> رجوع </div>
                <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-md">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-center border-b">اسم الضابط</th>
                            <th className="px-4 py-3 text-center border-b">السلاح</th>
                            <th className="px-4 py-3 text-center border-b">الرتبة</th>
                            <th className="px-4 py-3 text-center border-b">الرقم العسكري</th>
                            <th className="px-4 py-3 text-center border-b">تاريخ الاختبار</th>
                            <th className="px-4 py-3 text-center border-b">عرض الاجابات</th>
                            <th className="px-4 py-3 text-center border-b">عرض النتيجة</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((officer, index) => (
                            <tr key={index} className="hover:bg-gray-50" >
                                <td className="px-4 py-3 text-center border-b">{officer.name}</td>
                                <td className="px-4 py-3 text-center border-b">{officer.weapon}</td>
                                <td className="px-4 py-3 text-center border-b">{officer.rank}</td>
                                <td className="px-4 py-3 text-center border-b">{officer.milNumber}</td>
                                <td className="px-4 py-3 text-center border-b">{officer.createdAt.slice(0, 10)}</td>
                                <td className=" text-center border-b text-base">
                                    <button className='rounded bg-green-400 p-2' onClick={()=>{handleClick(officer, 'results')}}>عرض الاجابة</button>
                                </td>
                                <td className="px-4 py-3 text-center border-b">
                                    <button className='rounded bg-green-400 p-2' onClick={()=>{handleClick(officer, 'score')}}>عرض النتيجة</button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Officers;
