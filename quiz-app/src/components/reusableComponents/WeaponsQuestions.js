import React, { useEffect, useState } from 'react';
import Header from '../headers/Header';
import { useNavigate } from 'react-router-dom';
import { weapons } from '../utils/helpers';


const WeaponsQuestions = () => {
    const [inputs, setInputs] = useState([{ value: '', score: '' }]); // Start with one input field
    const [question, setQuestion] = useState();
    const navigate = useNavigate();

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const addInput = () => {
        setInputs([...inputs, '']); // Add a new empty input field
    };

    const removeInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs); // Remove the input field at the specified index
    };

    const addQuestion = (e) => {
        setQuestion(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs, question); // Handle form submission
    };

    useEffect(() => {
        sessionStorage.setItem('display', false)
    }, [])

    return (
        <div className='flex flex-col'>
            <Header />

            <form onSubmit={handleSubmit} className="space-y-4 w-[75%] lg:w-[50%] mx-auto mt-10" dir='rtl'>
                <select className='w-full p-3 font-semibold border-[1px] border-grey-400 focus:border-[1px] focus:outline-none focus:ring focus:ring-[#134B70] focus:rounded-lg'>
                    <option defaultValue="nafsy" defaultChecked disabled={true}>
                        حدد نوغ السلاح
                    </option>
                    {weapons.map((weapon, key) => {
                        return <option key={key} value={weapon}>
                            {weapon}
                        </option>
                    })}
                </select>
                <input
                    type="text"
                    className="border rounded p-3 w-full transition duration-200 border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring focus:ring-[#134B70] focus:rounded-lg"
                    onChange={addQuestion}
                    placeholder={`ادخل السؤال`}
                />
                {inputs.map((input, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input.value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="border rounded p-3 w-full transition duration-200 border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring focus:ring-[#134B70] focus:rounded-lg"
                            placeholder={`ادخل الاجابة رقم ${index + 1}`}
                        />

                        <button
                            type="button"
                            onClick={() => removeInput(index)}
                            className="ml-2 bg-red-500 text-white rounded p-2"
                        >
                            حذف
                        </button>
                    </div>
                ))}
                <div className='flex gap-4 justify-center'>
                    <button
                        type="button"
                        onClick={addInput}
                        className="bg-[#03346E] text-white rounded p-2"
                    >
                        اضافة اجابة
                    </button>
                    <button
                        type="submit"
                        className="bg-green-700 text-white rounded p-2"
                        onClick={() => navigate('/')}
                    >
                        حفظ السؤال
                    </button>
                </div>
            </form>
        </div>

    );
};

export default WeaponsQuestions;
