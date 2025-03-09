import React, { useState } from 'react';

const CustomSelectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Button to open the dropdown */}
      <button
        onClick={toggleDropdown}
        className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption}
       
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="max-h-60 overflow-y-auto">
            <li
              onClick={() => handleOptionSelect('Option 1')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Option 1
            </li>
            <li
              onClick={() => handleOptionSelect('Option 2')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Option 2
            </li>
            <li
              onClick={() => handleOptionSelect('Option 3')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Option 3
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelectDropdown;
