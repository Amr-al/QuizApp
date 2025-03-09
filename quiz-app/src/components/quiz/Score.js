import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getAnswers } from '../../config/apiConfig';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Score = () => {
    // Example results, replace these with dynamic values
    const result1 = 85; // Example result 1
    const result2 = 75; // Example result 2
    const [scores, setScore] = useState({});
    const [user, setUser] = useState();
    const navigate = useNavigate()
    const id = useParams().id;
    const getData = async () => {
        let res = await fetch(getAnswers + id);
        if (res.ok) {
            res = await res.json();
            let sum = 0, cnt = 0, topTen = 0;
            res.result.map((question, index) => {
                let currentScore = 0;
                question.questionId?.options.forEach(option => {
                    if (option.option == question.answer) {
                        currentScore = option.score;
                    }
                })
                if (index == 10) {
                    topTen = sum;
                    sum = 0;
                }
                sum += Number(currentScore);
            })
            console.log(cnt)
            setScore({ topTen: topTen, remaining: sum });
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

    // Chart data
    const data = {
        labels: [
            "نتيجة اختبارات السمات الشخصية و رؤية الاخريين للشخص",
            "نتيجة اختبارات القدرة علي حل المشكلات"
        ],
        datasets: [
            {
                label: 'النتيجة',
                data: [60, 40], // The result values
                backgroundColor: ['#4F46E5', '#10B981'], // Different colors for each segment
                borderColor: ['#4F46E5', '#10B981'],
                borderWidth: 1,
                
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
                font:{
                    size:18
                }
            },
            legend: {
                labels: {
                    font: {
                        size:18, // Font size for legend labels
                        weight:'bold'
                    },
                },
            },
            // Add this block to change font size for chart labels
            datalabels: {
                font: {
                    size: 20, // Size of the percentage/numerical labels inside the doughnut
                    weight:'bold'
                },
            },
    
        },
        cutout: 80,
        radius: '80%'
    };

    return (
        <div className=" flex items-center justify-center mt-4">
            <div className="bg-white rounded-lg shadow-base w-full max-w-3xl my-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-4 ">
                    نتائج الاختبار
                </h1>
                <div className='flex justify-between mb-2 font-semibold text-xl'>
                    <p>
                        الاسم: {user?.name}
                    </p>
                    <p>
                        الرقم العسكري: {user?.milNumber}
                    </p>
                    <p>
                        السلاح:  {user?.weapon}
                    </p>
                </div>
                <div className="mx-auto" style={{ width: '400px', height: '400px' }}>

                    <Doughnut data={data} options={options} />
                </div>
                <div className="text-center text-lg">
                    <div className="font-bold mb-2">
                        نتيجة اختبارات السمات الشخصية و رؤية الاخريين للشخص: {scores.topTen}
                    </div>
                    <div className="font-bold mb-2">
                        نتيجة اختبارات القدرة علي حل المشكلات: {scores.remaining}
                    </div>
                    <div className="font-bold mb-2">
                       المجموع الكلي : {scores.topTen + scores.remaining}
                    </div>
                </div>
                <div className='border-2 border-black h-56 w-full'>

            </div>
            </div>
            
        </div>
    );
};

export default Score;
