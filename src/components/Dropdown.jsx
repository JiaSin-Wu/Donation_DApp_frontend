import React from 'react';

const Dropdown = ({ label, options, selectedValue, onChange }) => {
  const normalizedOptions = options.map(option =>
    typeof option === 'string'
      ? { value: option, label: option }
      : option
  );

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#2c2f32] text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="" disabled hidden>
          -- Select a disaster --
        </option>
        {normalizedOptions.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-white bg-[#2c2f32]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

