import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { weapons } from '../../utils/helpers';
import { addQuestions } from '../../config/apiConfig'

const MultiInputForm = () => {
    const [inputs, setInputs] = useState([{ option: '', score: 0 }]); // Start with one input field
    const [question, setQuestion] = useState();
    // const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedWeapom, setWeapon] = useState('')

    const handleChange = (e) => {
        if (e.target.value != "اختياري") {
            setInputs([{ option: 'صح', score: 0 }, { option: 'غلط', score: 0 }]);
        } else {
            setInputs([{}])
        }
        setSelectedOption(e.target.value);
    };

    const handleWeapon = (e) => {
        setWeapon(e.target.value);
    }

    const handleInputChange = (index, type, value) => {
        const newInputs = [...inputs];
        newInputs[index][type] = value;
        setInputs(newInputs);
    };

    const addInput = () => {
        setInputs([...inputs, { option: '', score: 0 }]); // Add a new empty input field
    };

    const removeInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs); // Remove the input field at the specified index
    };

    const addQuestion = (e) => {
        setQuestion(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(addQuestions, {
            method: 'POST',
            body: JSON.stringify({
                question,
                options: inputs,
                type: selectedOption,
                weapon: selectedWeapom
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (res.ok) {
            alert('تم اضافه السؤال بنجاح');
            setInputs([{ option: '', score: 0 }]);
            setSelectedOption('');
            setQuestion('');
        } else {
            alert((await res.json()).message)
        }

    };

    useEffect(() => {
        sessionStorage.setItem('display', false)
    }, [])

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-[75%] lg:w-[50%] mx-auto mt-10" dir='rtl'>
            <select
                onChange={handleChange}
                value={selectedOption}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>
                    حدد نوع السؤال
                </option>
                <option value="اختياري"> اختياري </option>
                <option value="صح او خطأ"> صح او خطأ</option>
            </select>
            <select
                onChange={handleWeapon}
                value={selectedWeapom}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>
                    حدد السلاح
                </option>
                {weapons.map((weapon, key) => {
                    return <option key={key} value={weapon} >{weapon}</option>
                })}
            </select>
            <textarea
                type="text"
                className="border rounded p-3 w-full transition duration-200 border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring focus:ring-blue-500 focus:rounded-lg"
                onChange={addQuestion}
                placeholder={`ادخل السؤال`}
            />
            {inputs?.map((input, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input.value}
                        onChange={(e) => handleInputChange(index, 'option', e.target.value)}
                        disabled={selectedOption != "اختياري"}
                        className="border rounded p-3 w-full transition duration-200 border-[1px] border-gray-300 focus:border-[1px] focus:outline-none focus:ring focus:ring-[#134B70] focus:rounded-lg"
                        placeholder={selectedOption === "اختياري" ? `ادخل الاجابة رقم ${index + 1}` : index === 0 ? 'صح' : 'غلط'}
                    />
                    <input
                        type="number"
                        min={0}
                        value={input.score}
                        onChange={(e) => handleInputChange(index, 'score', e.target.value)}
                        className="border rounded p-2 flex-1"
                        placeholder={`ادخل الدرجة`}
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
                {selectedOption == 'اختياري' && <button
                    type="button"
                    onClick={addInput}
                    className="bg-[#03346E] text-white rounded p-2"
                >
                    اضافة اجابة
                </button>
                }
                <button
                    type="submit"
                    className="bg-green-700 text-white rounded p-2"
                >
                    حفظ السؤال
                </button>
            </div>
        </form>
    );
};

export default MultiInputForm;
