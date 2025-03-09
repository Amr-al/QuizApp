import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn_URL } from "../../config/apiConfig";

export default function SignIn() {
  const navigate = useNavigate();
  const [err,setErr] = useState();
  const [data,setData] = useState({});

  const handleSubmit = async (e) => {
    setErr(null);        // make error equal to null value which means there is no errors
    e.preventDefault();  // prevent the normal behvior of the form

    // sending the new user data to server
    const res = await fetch(SignIn_URL, {
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
      navigate('/')
    } else {
      setErr(result.message);
    }
  }
  const handleName = (e)=>{
    setData({...data,name:e.target.value});
  }
  const handlePass = (e)=>{
    setData({...data,password:e.target.value});
  }
  
  return (
    <div className="flex justify-between items-center bg-[#F1F1F1] h-screen w-screen px-4">
        <img alt="background" src="/bg.png" className="w-[40%] h-auto lg:block hidden" />
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto w-[90%] lg:w-[40%] h-fit bg-white rounded-xl p-8 drop-shadow-xl" dir="rtl">
          <div className="flex justify-center">
            <img alt="logo" src="/logo.png" className="w-12 h-12" />
            <h1 className="font-semibold lg:text-2xl m-auto">تسجيل الدخول</h1>
            <img alt="logo" src="/logo.png" className="w-12 h-12" />
          </div>
          <h5 className="text-sm mx-auto mt-4">منظومة الاختبارات / فرع شئون الضباط</h5>
          <label for="name" className="text-md font-bold mb-2">
            الاسم
          </label>
          <input onChange={handleName}id="name" type="text" className="text-lg p-3 border-solid border-[1px] border-gray-300 focus:border-[0px] focus:outline-none focus:ring-[1.7px] focus:ring-[#134B70] focus:rounded-lg transition duration-200"></input>
          <label for="password" className="text-md font-bold my-2">
            الباسورد
          </label>
          <input onChange={handlePass} id="password" type="password" className="text-lg p-3 border-solid border-[1px] border-gray-300 focus:border-[0px] focus:outline-none focus:ring-[1.7px] focus:ring-[#134B70] focus:rounded-lg transition duration-200"></input>
          {err && <p className="text-red-700 font-semibold text-center mt-2">{err}</p> }
          <button type="submit" className="bg-[#03346E] transition duration-200 hover:bg-[#134B70] p-3 text-white mt-4 w-full mx-auto rounded-lg">
            تسجيل الدخول 
          </button>
        </form>

      </div>
    
  );
}
