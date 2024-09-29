import React from 'react';
import { WordCategory } from '@/app/page';

type SelectProps = {
  options: WordCategory[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm border border-gray-300 rounded-md p-[6px] ${className}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;