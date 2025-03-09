import React, { useState } from 'react';
import CustomSelectDropdown from '../reusableComponents/CustomSelect';

const Test = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const officersData = [
    {
      name: 'أحمد علي',
      weapon: 'البندقية',
      rank: 'ملازم',
      militaryNumber: '123456',
      testDate: '2024-09-15',
    },
    {
      name: 'محمد عبد الله',
      weapon: 'المسدس',
      rank: 'نقيب',
      militaryNumber: '654321',
      testDate: '2024-10-10',
    },
    {
      name: 'يوسف سعيد',
      weapon: 'الرشاش',
      rank: 'رائد',
      militaryNumber: '987654',
      testDate: '2024-08-20',
    },
    // Add more rows as necessary
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-center border-b">اسم الضابط</th>
            <th className="px-4 py-3 text-center border-b">السلاح</th>
            <th className="px-4 py-3 text-center border-b">الرتبة</th>
            <th className="px-4 py-3 text-center border-b">الرقم العسكري</th>
            <th className="px-4 py-3 text-center border-b">تاريخ الاختبار</th>
          </tr>
        </thead>
        <tbody>
          {officersData.map((officer, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-center border-b">{officer.name}</td>
              <td className="px-4 py-3 text-center border-b">{officer.weapon}</td>
              <td className="px-4 py-3 text-center border-b">{officer.rank}</td>
              <td className="px-4 py-3 text-center border-b">{officer.militaryNumber}</td>
              <td className="px-4 py-3 text-center border-b">{officer.testDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
