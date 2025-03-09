import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ranks, weapons } from "../../utils/helpers";
import { SignUp_URL } from "../../config/apiConfig";
// 246835
export default function StartQuiz() {
  const navigate = useNavigate();
  const [err, setErr] = useState();

  const [data, setData] = useState({ role: 'user' })
  const handelSubmit = async (e) => {
    setErr(null);        // make error equal to null value which means there is no errors
    e.preventDefault();  // prevent the normal behvior of the form

    // sending the new user data to server
    const res = await fetch(SignUp_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const result = await res.json();
    // if there is no errors save the user data into sessionStorage
    if (res.ok) {
      sessionStorage.setItem('auth', result.token)
      sessionStorage.setItem('timer', 1200)
      navigate('/questions')
    } else {
      setErr(result.message);
    }
  }
  const handleName = (e) => {
    setData({ ...data, name: e.target.value });
  }
  const handleMilNumber = (e) => {
    setData({ ...data, milNumber: e.target.value });
  }
  const handleRank = (e) => {
    setData({ ...data, rank: e.target.value })
  }
  const handleWeapon = (e) => {
    setData({ ...data, weapon: e.target.value })
  }

  return (
    <div className="flex justify-between items-center bg-[#F1F1F1] h-screen w-screen px-4">
      <img alt="background" src="/bg.png" className="w-[40%] h-auto lg:block hidden" />
      <div className="flex flex-col mx-auto min-w-fit w-[85%] lg:w-[40%] h-fit bg-white rounded-xl p-8 drop-shadow-xl" dir="rtl">
        <div className="flex justify-center">
          <img alt="logo" src="/logo.png" className="w-12 h-12" />
          <h1 className="font-semibold text-base md:text-2xl mx-auto mb-4 text-center my-auto">تسجيل الدخول</h1>
          <img alt="logo" src="/logo.png" className="w-12 h-12" />
        </div>
        <form className="flex flex-col" onSubmit={handelSubmit}>
          <h5 className="text-sm mx-auto md:block hidden">منظومة الاختبارات / فرع شئون ضباط</h5>
          <label for="name" className="font-bold mb-2">
            الاسم
          </label>
          <input required onChange={handleName} id="name" type="text" className="text-lg p-3 border-solid border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring-[1.7px] focus:ring-[#134B70] focus:rounded-lg transition duration-200"></input>
          <label for="milNumber" className="font-bold my-2">
            الرقم العسكري
          </label>
          <input required onChange={handleMilNumber} id="mil" type="text" className="text-lg p-3 border-solid border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring-[1.7px] focus:ring-[#134B70] focus:rounded-lg transition duration-200"></input>
          <label for="rank" className="font-bold my-2">
            الرتبة
          </label>
          <select onChange={handleRank} className='w-full p-3 font-semibold border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring focus:ring-[#134B70] focus:rounded-lg'>
            <option defaultChecked value=""></option>
            {ranks.map((rank, key) => {
              return <option key={key} value={rank}>
                {rank}
              </option>
            })}
          </select>
          <label for="weapon" className="font-bold my-2">
            السلاح
          </label>
          <select onChange={handleWeapon} className='w-full p-3 font-semibold border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring focus:ring-[#134B70] focus:rounded-lg'>
            <option defaultChecked value=""></option>
            {weapons.map((weapon, key) => {
              return <option key={key} value={weapon}>
                {weapon}
              </option>
            })}
          </select>
          {err && <p className="text-center text-red-800 mt-2">{err}</p>}
          <button type="submit" className="bg-[#03346E] transition duration-200 hover:bg-[#134B70] p-3 text-white mt-4 w-full mx-auto rounded-lg">
            بدء الاختبار
          </button>
        </form>
      </div>

    </div>

  );
}
